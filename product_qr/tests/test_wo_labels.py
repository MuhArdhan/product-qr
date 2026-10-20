"""Copy-phase checks. No Production App imports and no operational writes."""

import base64
import json
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import TestCase
from unittest.mock import Mock, patch

import frappe
from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding, rsa

from product_qr.wo_labels import labels, qz_signing, work_order


def _throw(message, *args, **kwargs):
	raise ValueError(message)


class TestWoLabelData(TestCase):
	def setUp(self):
		self.wo = frappe._dict(name="WO-LABEL-TEST", production_item="SKU-TEST", custom_uom="Pack",
			custom_prepacking_confirmed=1, custom_good_qty_prepacking=12,
			actual_start_date="2026-10-19", planned_start_date="2026-10-18", creation="2026-10-17",
			check_permission=Mock(), reload=Mock())
		self.batch = frappe._dict(name="BATCH-TEST", manufacturing_date="2026-10-19", expiry_date="2026-11-30")
		self.serials = {}
		self.mappings = []
		self.locks = []
		for owner, name, options in (
			(labels, "_", {"side_effect": lambda text: text}),
			(labels, "skips_prepacking", {"return_value": False}),
			(labels, "_enrich_units", {"side_effect": lambda rows: rows[0].update(display_conversion_factor=5)}),
			(frappe, "get_doc", {"side_effect": self.get_doc}),
			(frappe, "get_all", {"side_effect": self.get_all}),
			(frappe.db, "table_exists", {"return_value": True}),
			(frappe.db, "get_value", {"side_effect": self.get_value}),
			(frappe, "throw", {"side_effect": _throw}),
		):
			patcher = patch.object(owner, name, **options)
			patcher.start()
			self.addCleanup(patcher.stop)

	def get_doc(self, doctype, name=None):
		if doctype == "Work Order":
			return self.wo
		self.assertTrue(self.locks, "Must lock WO before serial writes")
		self.assertIsInstance(doctype, dict)
		values = dict(doctype)
		def insert(**kwargs):
			self.assertTrue(kwargs.get("ignore_permissions"))  # same WO-authorized boundary as source
			if values["doctype"] == labels.SERIAL_DOCTYPE:
				serial_no = f"S{len(self.serials) + 1:03}"
				serial = frappe._dict(values, name=f"PQR-{serial_no}", serial_no=serial_no,
					qr_payload=f"{values['item_code']}-{values['batch_no'] or 'NOBATCH'}-{serial_no}")
				self.serials[serial.name] = serial
				return serial
			self.assertEqual(values["doctype"], labels.MAPPING_DOCTYPE)
			self.mappings.append(frappe._dict(product_qr_serial=values["product_qr_serial"]))
			return frappe._dict(values)
		return Mock(insert=insert)

	def get_all(self, doctype, **kwargs):
		if doctype == labels.MAPPING_DOCTYPE:
			return list(self.mappings)
		self.assertEqual(doctype, "Batch")
		return [self.batch] if self.batch else []

	def get_value(self, doctype, name, fields=None, **kwargs):
		if doctype == "Work Order":
			self.assertTrue(kwargs.get("for_update"))
			self.locks.append(name)
			return name
		if doctype == labels.SERIAL_DOCTYPE:
			return self.serials.get(name)
		if doctype == "Batch":
			return self.batch if self.batch and self.batch.name == name else None
		self.assertEqual((doctype, name), ("Item", "SKU-TEST"))
		return frappe._dict(item_name="Dough Chocolate", shelf_life_in_days=30)

	def test_unique_issue_retry_and_extra_reuse_mappings(self):
		first = labels.get_label_data(self.wo.name)
		self.assertEqual(first["label_count"], 3)
		self.assertEqual([row["qr_value"] for row in first["labels"]], [f"SKU-TEST-BATCH-TEST-S{i:03}" for i in range(1, 4)])
		self.assertEqual(labels.get_label_data(self.wo.name), first)
		self.assertEqual(len(self.serials), 3)
		extra = labels.get_label_data(self.wo.name, extra=2)
		self.assertEqual(extra["labels"][:3], first["labels"])
		self.assertEqual(len(extra["labels"]), 5)
		self.assertEqual(len(self.serials), 5)
		self.assertEqual(len(self.mappings), 5)
		self.assertEqual(labels.label_data(self.wo.name)["labels"], first["labels"])

	def test_browser_requires_existing_serials_and_does_not_write(self):
		with self.assertRaises(ValueError):
			labels.label_data(self.wo.name)
		self.assertFalse(self.serials)
		self.assertFalse(self.locks)
		self.wo.check_permission.assert_called_once_with("read")

	def test_permission_denial_precedes_lock_or_writes(self):
		self.wo.check_permission.side_effect = frappe.PermissionError
		with self.assertRaises(frappe.PermissionError):
			labels.get_label_data(self.wo.name)
		self.assertFalse(self.locks)
		self.assertFalse(self.serials)

	def test_missing_mapping_schema_fails_without_allocating_serials(self):
		frappe.db.table_exists.side_effect = lambda doctype: doctype != labels.MAPPING_DOCTYPE
		with self.assertRaisesRegex(ValueError, "Work Order QR Label"):
			labels.get_label_data(self.wo.name)
		frappe.get_doc.assert_not_called()
		self.assertFalse(self.serials)

	def test_multiple_native_batches_rejected_before_serial_allocation(self):
		with patch.object(frappe, "get_all", return_value=[self.batch, self.batch]):
			with self.assertRaisesRegex(ValueError, "lebih dari satu Batch"):
				labels._single_batch(self.wo)
		self.assertFalse(self.serials)

	def test_skip_prepacking_uses_postpacking(self):
		labels.skips_prepacking.return_value = True
		self.wo.update(custom_prepacking_confirmed=0, custom_postpacking_confirmed=1, custom_good_qty_postpacking=6)
		self.assertEqual(labels.get_label_data(self.wo.name)["label_count"], 2)

	def test_invalid_good_and_extra_never_issue_serials(self):
		for good in (0, -1, float("nan"), float("inf")):
			self.wo.custom_good_qty_prepacking = good
			with self.subTest(good=good), self.assertRaises(ValueError):
				labels.get_label_data(self.wo.name)
		self.wo.custom_good_qty_prepacking = 12
		for extra in (-1, "1.5", "abc", 10000):
			with self.subTest(extra=extra), self.assertRaises(ValueError):
				labels.get_label_data(self.wo.name, extra)
		self.assertFalse(self.serials)

	def test_dates_name_and_fallback_match_source(self):
		data = labels.get_label_data(self.wo.name)
		self.assertEqual((data["item_name_prefix"], data["item_name_main"]), ("Dough", "Chocolate"))
		self.assertEqual(data["expiry_date"], "2026-11-30")
		self.serials.clear()
		self.mappings.clear()
		self.batch = None
		data = labels.get_label_data(self.wo.name)
		self.assertEqual(str(data["expiry_date"]), "2026-11-18")
		self.assertIn("-NOBATCH-S001", data["labels"][0]["qr_value"])

	def test_new_batch_does_not_reassign_previously_batchless_serials(self):
		self.batch = None
		first = labels.get_label_data(self.wo.name)
		self.batch = frappe._dict(name="NEW-BATCH", manufacturing_date="2026-10-19", expiry_date=None)
		self.assertEqual(labels.get_label_data(self.wo.name)["labels"], first["labels"])

	def test_browser_svg_reads_same_issued_serials(self):
		from product_qr.www import product_qr_work_order_label
		issued = labels.get_label_data(self.wo.name)
		with patch.object(frappe.local, "form_dict", frappe._dict(name=self.wo.name)):
			context = product_qr_work_order_label.get_context(frappe._dict())
		self.assertEqual([row["qr_value"] for row in context.labels], [row["qr_value"] for row in issued["labels"]])
		self.assertTrue(all(row["qr_svg_base64"] for row in context.labels))
		self.assertEqual(len(self.serials), 3)

	def test_browser_layout_json_is_safe_and_preserves_identity(self):
		from product_qr.www import product_qr_work_order_label

		payload = "</script><script>alert(1)</script>"
		data = {"work_order": self.wo.name, "item_name": payload, "labels": [{"qr_value": payload, "serial_no": "S001"}]}
		with patch.object(product_qr_work_order_label, "label_data", return_value=data), patch.object(frappe.local, "form_dict", frappe._dict(name=self.wo.name)):
			context = product_qr_work_order_label.get_context(frappe._dict())
		self.assertNotIn("<", context.layout_data_json)
		self.assertEqual(json.loads(context.layout_data_json), data)
		self.assertFalse(self.serials)


class TestWoLabelUom(TestCase):
	def test_default_inventory_uom_and_variant_fallback(self):
		item = frappe._dict(stock_uom="Pcs", custom_default_inventory_unit_of_measure="Pack", variant_of="TEMPLATE",
			uoms=[frappe._dict(uom="Pcs", conversion_factor=1)])
		template = frappe._dict(uoms=[frappe._dict(uom="Pack", conversion_factor=6)])
		with patch.object(frappe, "get_cached_doc", side_effect=lambda dt, name: template if name == "TEMPLATE" else item), patch.object(frappe, "get_cached_value", return_value=1):
			rows = [frappe._dict(production_item="TEST", custom_uom="Box")]
			work_order._enrich_units(rows)
			self.assertEqual(rows[0].display_uom, "Pack")
			self.assertEqual(rows[0].display_conversion_factor, 6)

	def test_missing_item_and_invalid_factor_do_not_assume_one(self):
		with patch.object(frappe, "get_cached_doc", side_effect=frappe.DoesNotExistError):
			rows = [frappe._dict(production_item="MISSING")]
			work_order._enrich_units(rows)
			self.assertIsNone(rows[0].display_conversion_factor)


class TestWoLabelSigning(TestCase):
	def test_layout_test_signs_without_work_order_or_serial_writes(self):
		with TemporaryDirectory() as directory, patch.object(frappe, "get_site_path", return_value=str(Path(directory) / "missing")), patch.object(frappe, "session", frappe._dict(user="settings@example.com")), patch.object(frappe, "has_permission", return_value=True) as permission, patch.object(frappe, "get_doc") as get_doc, patch.object(qz_signing, "_check_work_order") as check_wo:
			cert_path, _key = qz_signing._files()
			cert = x509.load_pem_x509_certificate(cert_path.read_bytes())
			request = "b" * 64
			signature = base64.b64decode(qz_signing.layout_sign(request))
			cert.public_key().verify(signature, request.encode(), padding.PKCS1v15(), hashes.SHA512())
			self.assertEqual(qz_signing.layout_certificate(), cert_path.read_text(encoding="ascii"))
			permission.assert_called_with("Manufacturing Settings", "write")
			get_doc.assert_not_called()
			check_wo.assert_not_called()

	def test_layout_test_rejects_guest_or_missing_settings_permission(self):
		for user in ("Guest", "denied@example.com"):
			with self.subTest(user=user), patch.object(frappe, "session", frappe._dict(user=user)), patch.object(frappe, "has_permission", return_value=False), patch.object(frappe, "throw", side_effect=_throw), patch.object(qz_signing, "_files") as files:
				with self.assertRaises(ValueError):
					qz_signing.layout_certificate()
				with self.assertRaises(ValueError):
					qz_signing.layout_sign("b" * 64)
				files.assert_not_called()

	def test_layout_test_rejects_invalid_hash_before_reading_key(self):
		with patch.object(frappe, "session", frappe._dict(user="settings@example.com")), patch.object(frappe, "has_permission", return_value=True), patch.object(frappe, "throw", side_effect=_throw), patch.object(qz_signing, "_files") as files:
			with self.assertRaises(ValueError):
				qz_signing.layout_sign("invalid")
			files.assert_not_called()

	def test_site_override_fallback_and_partial_pair(self):
		with TemporaryDirectory() as directory:
			base = Path(directory)
			site = base / "site"
			site.mkdir()
			with patch.object(frappe, "get_site_path", return_value=str(site)), patch.object(frappe, "get_app_path", return_value=str(base / "app")) as app_path:
				self.assertEqual(qz_signing._files()[1], base / "app/private-key.pem")
				app_path.assert_called_with("product_qr", "qz_signing")
				for name in ("digital-certificate.txt", "private-key.pem"):
					(site / name).touch()
					self.assertEqual(qz_signing._files(), (site / "digital-certificate.txt", site / "private-key.pem"))

	def test_bundled_pair_matches_and_signs_with_server_only_private_key(self):
		with TemporaryDirectory() as directory, patch.object(frappe, "get_site_path", return_value=str(Path(directory) / "missing")):
			cert_path, key_path = qz_signing._files()
			cert = x509.load_pem_x509_certificate(cert_path.read_bytes())
			key = serialization.load_pem_private_key(key_path.read_bytes(), password=None)
			self.assertEqual(cert.public_key().public_numbers(), key.public_key().public_numbers())
			with patch.object(qz_signing, "_check_work_order"):
				request = "a" * 64
				sig = base64.b64decode(qz_signing.sign("WO-TEST", request))
				cert.public_key().verify(sig, request.encode(), padding.PKCS1v15(), hashes.SHA512())
				self.assertEqual(qz_signing.certificate("WO-TEST"), cert_path.read_text(encoding="ascii"))

	def test_invalid_hash_and_unconfirmed_work_order_are_rejected(self):
		wo = Mock()
		wo.get.return_value = False
		with patch.object(qz_signing, "_", side_effect=lambda text: text), patch.object(frappe, "session", frappe._dict(user="test@example.com")), patch.object(frappe, "get_doc", return_value=wo), patch.object(qz_signing, "skips_prepacking", return_value=False), patch.object(frappe, "throw", side_effect=_throw):
			with self.assertRaises(ValueError):
				qz_signing.sign("WO-TEST", "a" * 64)
			wo.get.return_value = True
			with self.assertRaises(ValueError):
				qz_signing.sign("WO-TEST", "invalid")


class TestWoLabelOwnership(TestCase):
	def test_schema_is_owned_and_exported_only_by_product_qr(self):
		package = Path(labels.__file__).parents[1]
		meta = json.loads((package / "product_qr/doctype/work_order_qr_label/work_order_qr_label.json").read_text())
		self.assertEqual(meta["module"], "Product QR")
		self.assertEqual(meta["name"], "Work Order QR Label")
		self.assertFalse((package / "wo_labels/schema/work_order_qr_label.json").exists())
		production_export = package.parents[1] / "production_app/production_app/production_app/doctype/work_order_qr_label/work_order_qr_label.json"
		self.assertFalse(production_export.exists())

	def test_legacy_routes_delegate_to_product_qr(self):
		from product_qr import hooks
		self.assertEqual(hooks.override_whitelisted_methods["production_app.api.work_order.get_label_data"], "product_qr.wo_labels.labels.get_label_data")
		self.assertIn({"from_route": "/work_order_label", "to_route": "product_qr_work_order_label"}, hooks.website_route_rules)
		self.assertTrue(any(row["source"] == "/qz-certificate" and "product_qr.wo_labels.qz_signing.download_certificate" in row["target"] for row in hooks.website_redirects))

	def test_runtime_modules_do_not_import_production_app(self):
		import ast
		for path in Path(labels.__file__).parent.glob("*.py"):
			for node in ast.walk(ast.parse(path.read_text())):
				if isinstance(node, ast.ImportFrom):
					self.assertFalse((node.module or "").startswith("production_app"), str(path))
				elif isinstance(node, ast.Import):
					self.assertFalse(any(alias.name.startswith("production_app") for alias in node.names), str(path))


class TestWoLabelMapping(TestCase):
	def test_mapping_reassignment_is_rejected(self):
		from product_qr.wo_labels.mapping import WorkOrderQRLabel
		doc = Mock(work_order="WO-NEW", product_qr_serial="PQR-1", doctype="Work Order QR Label")
		doc.name = "PQR-1"
		doc.is_new.return_value = False
		values = ["SKU-1", frappe._dict(item_code="SKU-1", batch_no=None), frappe._dict(work_order="WO-OLD", product_qr_serial="PQR-1")]
		with patch.object(frappe.db, "get_value", side_effect=values), patch("product_qr.wo_labels.mapping._", side_effect=lambda text: text), patch.object(frappe, "throw", side_effect=_throw):
			with self.assertRaisesRegex(ValueError, "cannot be reassigned"):
				WorkOrderQRLabel.validate(doc)

	def test_mapping_rejects_another_work_orders_batch(self):
		from product_qr.wo_labels.mapping import WorkOrderQRLabel
		doc = Mock(work_order="WO-1", product_qr_serial="PQR-1")
		doc.is_new.return_value = True
		values = ["SKU-1", frappe._dict(item_code="SKU-1", batch_no="BATCH-1"), frappe._dict(item="SKU-1", reference_doctype="Work Order", reference_name="WO-OTHER")]
		with patch.object(frappe.db, "get_value", side_effect=values), patch("product_qr.wo_labels.mapping._", side_effect=lambda text: text), patch.object(frappe, "throw", side_effect=_throw):
			with self.assertRaisesRegex(ValueError, "Batch must belong"):
				WorkOrderQRLabel.validate(doc)
