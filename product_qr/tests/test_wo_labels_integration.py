"""Native serial/mapping proof using rollback-only test Items/BOM/WO/Batch."""

from unittest.mock import patch

import frappe
from frappe.tests import IntegrationTestCase
from frappe.utils import add_days, nowdate, random_string

from product_qr.wo_labels import labels


class TestWoLabelsNative(IntegrationTestCase):
	def test_legacy_print_route_resolves_to_product_qr_in_request_context(self):
		from werkzeug.wrappers import Request
		from frappe.website.path_resolver import resolve_path

		request = Request.from_values("/work_order_label", base_url="http://development.localhost:8000")
		with patch.object(frappe.local, "request", request, create=True), patch.object(frappe.local, "path", "", create=True):
			self.assertEqual(resolve_path("work_order_label"), "product_qr_work_order_label")

	def test_native_issue_retry_additional_and_read_reuse_same_serials(self):
		self.assertTrue(frappe.db.table_exists(labels.MAPPING_DOCTYPE), "Migrate Product QR schema first")
		self.assertEqual(frappe.get_meta(labels.MAPPING_DOCTYPE).module, "Product QR")
		from frappe.model.base_document import get_controller
		self.assertTrue(get_controller(labels.MAPPING_DOCTYPE).__module__.startswith("product_qr."))
		self.assertEqual(frappe.override_whitelisted_method("production_app.api.work_order.get_label_data"), "product_qr.wo_labels.labels.get_label_data")
		if not frappe.get_meta("Work Order").has_field("custom_prepacking_confirmed"):
			self.skipTest("Existing WO packing metadata required; copy phase does not create it")
		frappe.set_user("Administrator")
		warehouse = frappe.db.get_value("Warehouse", {"is_group": 0, "disabled": 0}, ["name", "company"], as_dict=True)
		group = frappe.db.get_value("Item Group", {"is_group": 0}, "name")
		uom = "Nos" if frappe.db.exists("UOM", "Nos") else frappe.db.get_value("UOM", {}, "name")
		if not warehouse or not group or not uom:
			self.skipTest("Company/warehouse/item group/UOM required for isolated native fixtures")
		currency = frappe.db.get_value("Company", warehouse.company, "default_currency")
		prefix = "TESTPQRWO-" + random_string(8).upper()
		items = []
		for suffix, batched in (("RM", False), ("FG", True)):
			item = frappe.get_doc({
				"doctype": "Item", "item_code": f"{prefix}-{suffix}", "item_name": f"Dough {prefix}-{suffix}",
				"item_group": group, "stock_uom": uom, "is_stock_item": 1,
				"is_purchase_item": 0, "is_sales_item": 0, "has_batch_no": int(batched),
				"create_new_batch": 0, "standard_rate": 100, "opening_stock": 0,
				"item_defaults": [{"company": warehouse.company, "default_warehouse": warehouse.name}],
			}).insert()
			items.append(item)
		rm, fg = items
		bom = frappe.get_doc({
			"doctype": "BOM", "item": fg.name, "company": warehouse.company, "currency": currency,
			"quantity": 1, "items": [{"item_code": rm.name, "qty": 1, "rate": 10,
				"uom": uom, "stock_uom": uom, "source_warehouse": warehouse.name}],
		}).insert()
		bom.submit()
		wo = frappe.get_doc({
			"doctype": "Work Order", "production_item": fg.name, "bom_no": bom.name,
			"company": warehouse.company, "qty": 3, "planned_start_date": nowdate(),
			"source_warehouse": warehouse.name, "wip_warehouse": warehouse.name,
			"fg_warehouse": warehouse.name, "scrap_warehouse": warehouse.name,
			"custom_prepacking_confirmed": 1, "custom_good_qty_prepacking": 3,
			"custom_uom": uom,
		}).insert()
		batch = frappe.get_doc({
			"doctype": "Batch", "item": fg.name, "batch_id": prefix + "-BATCH",
			"reference_doctype": "Work Order", "reference_name": wo.name,
			"manufacturing_date": nowdate(), "expiry_date": add_days(nowdate(), 30),
		}).insert()

		first = labels.get_label_data(wo.name)
		self.assertEqual(first["batch_no"], batch.name)
		self.assertEqual(first["label_count"], 3)
		self.assertEqual(len({row["qr_value"] for row in first["labels"]}), 3)
		self.assertEqual([row["serial_no"] for row in first["labels"]], ["S001", "S002", "S003"])
		self.assertEqual(first, labels.get_label_data(wo.name))
		extra = labels.get_label_data(wo.name, extra=2)
		self.assertEqual(extra["labels"][:3], first["labels"])
		self.assertEqual([row["serial_no"] for row in extra["labels"]], [f"S{i:03}" for i in range(1, 6)])
		self.assertEqual(frappe.db.count(labels.MAPPING_DOCTYPE, {"work_order": wo.name}), 5)
		self.assertEqual(frappe.db.count(labels.SERIAL_DOCTYPE, {"item_code": fg.name, "batch_no": batch.name}), 5)
		self.assertEqual(labels.label_data(wo.name)["labels"], first["labels"])
