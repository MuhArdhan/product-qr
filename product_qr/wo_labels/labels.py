"""Issue and reprint unique Work Order labels owned by Product QR."""

import json
import math
import re

import frappe
from frappe import _
from frappe.utils import add_days, flt, getdate

from product_qr.wo_labels.work_order import _enrich_units, skips_prepacking

MAX_LABELS = 10000
MAX_LABEL_NUMBER = 2147483647
MAPPING_DOCTYPE = "Work Order QR Label"
SERIAL_DOCTYPE = "Product QR Serial"


def _count_value(value, label, *, allow_zero):
	raw = str(value if value is not None else "0")
	if len(raw) > 5 or not re.fullmatch(r"[0-9]+", raw):
		frappe.throw(_("{0} harus berupa bilangan bulat.").format(label))
	count = int(raw)
	if count > MAX_LABELS or (not allow_zero and count < 1):
		frappe.throw(_("{0} harus antara {1} dan {2}.").format(label, 0 if allow_zero else 1, MAX_LABELS))
	return count


def _label_count(wo, extra=0):
	stage = "postpacking" if skips_prepacking(wo.production_item) else "prepacking"
	stage_label = "Post-Packing" if stage == "postpacking" else "Pre-Packing"
	good_qty = flt(wo.get(f"custom_good_qty_{stage}"))
	if not wo.get(f"custom_{stage}_confirmed") or not math.isfinite(good_qty) or good_qty <= 0:
		frappe.throw(_("Simpan {0} dengan Good Qty lebih dari nol sebelum mencetak label.").format(stage_label))
	units = frappe._dict(production_item=wo.production_item, custom_uom=wo.get("custom_uom"))
	_enrich_units([units])
	factor = units.display_conversion_factor
	if factor is None or not math.isfinite(flt(factor)) or flt(factor) <= 0:
		frappe.throw(units.uom_warning or _("Konversi satuan Item belum valid untuk mencetak label."))
	extra_count = _count_value(extra, _("Jumlah label tambahan"), allow_zero=True)
	suggested = max(1, math.ceil(good_qty / flt(factor) - 1e-8))
	count = suggested + extra_count
	if count > MAX_LABELS:
		frappe.throw(_("Jumlah label melebihi batas {0} dalam satu cetakan.").format(MAX_LABELS))
	return count


def _selected_label_numbers(values):
	if values is None or values == "":
		return []
	if isinstance(values, str):
		raw = values.strip()
		if raw.startswith("["):
			try:
				values = json.loads(raw)
			except (TypeError, ValueError):
				frappe.throw(_("Daftar nomor urut label tidak valid."))
		else:
			values = re.split(r"[,;\s]+", raw)
	if not isinstance(values, (list, tuple)):
		frappe.throw(_("Daftar nomor urut label tidak valid."))
	label_numbers = []
	for value in values:
		raw = str(value).strip()
		if not re.fullmatch(r"[0-9]+", raw) or int(raw) < 1 or int(raw) > MAX_LABEL_NUMBER:
			frappe.throw(_("Nomor urut label harus berupa bilangan bulat antara 1 dan {0}.").format(MAX_LABEL_NUMBER))
		label_numbers.append(int(raw))
	if len(label_numbers) > MAX_LABELS:
		frappe.throw(_("Maksimal {0} nomor urut label per cetakan.").format(MAX_LABELS))
	if len(set(label_numbers)) != len(label_numbers):
		frappe.throw(_("Nomor urut label yang dipilih tidak boleh duplikat."))
	return sorted(label_numbers)


def _single_batch(wo):
	batches = frappe.get_all(
		"Batch",
		filters={"reference_doctype": "Work Order", "reference_name": wo.name, "item": wo.production_item},
		fields=["name", "manufacturing_date", "expiry_date"],
		order_by="creation asc",
		limit=2,
	)
	if len(batches) > 1:
		frappe.throw(_("Work Order {0} memiliki lebih dari satu Batch; label QR perlu satu Batch yang pasti.").format(wo.name))
	return batches[0] if batches else None


def _mapped_serials(wo, mapping_rows):
	if not mapping_rows:
		return [], None
	serials = []
	for index, mapping in enumerate(mapping_rows, start=1):
		serial_name = mapping.product_qr_serial
		serial = frappe.db.get_value(
			SERIAL_DOCTYPE,
			serial_name,
			["item_code", "batch_no", "serial_no", "qr_payload"],
			as_dict=True,
		)
		if not serial or serial.item_code != wo.production_item:
			frappe.throw(_("Serial label Work Order tidak cocok dengan Item saat ini."))
		serials.append(frappe._dict(
			name=serial_name,
			item_code=serial.item_code,
			batch_no=serial.batch_no,
			serial_no=serial.serial_no,
			qr_payload=serial.qr_payload,
			label_number=mapping.get("label_number") or index,
			adonan_ke=mapping.get("adonan_ke") if mapping.get("adonan_ke") is not None else (wo.get("custom_adonan_ke") or None),
		))
	label_numbers = [serial.label_number for serial in serials]
	if len(label_numbers) != len(set(label_numbers)) or any(number < 1 for number in label_numbers):
		frappe.throw(_("Mapping nomor urut label Work Order tidak valid atau duplikat."))
	batch_no = serials[0].batch_no or None
	if any((serial.batch_no or None) != batch_no for serial in serials):
		frappe.throw(_("Serial label Work Order memiliki Batch yang berbeda."))
	if batch_no and not frappe.db.get_value(
		"Batch", batch_no, ["name", "manufacturing_date", "expiry_date"], as_dict=True
	):
		frappe.throw(_("Batch pada serial label Work Order tidak ditemukan."))
	serials.sort(key=lambda serial: serial.label_number)
	return serials, batch_no


def _label_payload(wo, batch_no, serials):
	batch = (
		frappe.db.get_value("Batch", batch_no, ["name", "manufacturing_date", "expiry_date"], as_dict=True)
		if batch_no
		else None
	)
	labels = []
	for serial in serials:
		if (serial.item_code, serial.batch_no or None) != (wo.production_item, batch_no):
			frappe.throw(_("Serial label Work Order tidak cocok dengan Item atau Batch saat ini."))
		labels.append({
			"label_number": serial.label_number,
			"adonan_ke": serial.adonan_ke,
			"serial_no": serial.serial_no,
			"qr_value": serial.qr_payload,
		})
	item = frappe.db.get_value("Item", wo.production_item, ["item_name", "shelf_life_in_days"], as_dict=True)
	item_name = item.item_name if item else wo.production_item
	dough_match = re.search(r"\bdough\b", item_name, flags=re.IGNORECASE)
	dough_tail = item_name[dough_match.end():].strip() if dough_match else ""
	manufacturing_date = (batch.manufacturing_date if batch else None) or getdate(
		wo.actual_start_date or wo.planned_start_date or wo.creation
	)
	expiry_date = batch.expiry_date if batch else None
	if not expiry_date and item and item.shelf_life_in_days:
		expiry_date = add_days(manufacturing_date, int(item.shelf_life_in_days))
	return {
		"work_order": wo.name,
		"adonan_ke": labels[0]["adonan_ke"] if labels and all(row["adonan_ke"] == labels[0]["adonan_ke"] for row in labels) else None,
		"sku": wo.production_item,
		"batch_no": batch_no,
		"item_name": item_name,
		"item_name_prefix": item_name[:dough_match.end()].strip() if dough_tail else "",
		"item_name_main": dough_tail if dough_tail else item_name,
		"manufacturing_date": manufacturing_date,
		"expiry_date": expiry_date,
		"label_count": len(labels),
		"labels": labels,
	}


def label_data(name, extra=0, *, issue=False, append_count=None, label_numbers=None):
	"""Reuse issued serials or allocate only the requested new mappings under the WO row lock."""
	if not frappe.db.table_exists(SERIAL_DOCTYPE):
		frappe.throw(_("App product_qr harus dipasang dan dimigrasi sebelum mencetak label."))
	if not frappe.db.table_exists(MAPPING_DOCTYPE):
		frappe.throw(_("DocType Work Order QR Label belum dimigrasi."))
	wo = frappe.get_doc("Work Order", name)
	wo.check_permission("write" if issue else "read")
	if issue:
		frappe.db.get_value("Work Order", name, "name", for_update=True)
		wo.reload()

	selected = _selected_label_numbers(label_numbers)
	if label_numbers is not None and not selected:
		frappe.throw(_("Pilih minimal satu nomor urut label untuk dicetak ulang."))
	extra_count = _count_value(extra, _("Jumlah label tambahan"), allow_zero=True)
	if selected and extra_count:
		frappe.throw(_("Cetak ulang nomor urut terpisah dari penerbitan label tambahan."))
	if append_count is not None:
		append_count = _count_value(append_count, _("Jumlah label lanjutan"), allow_zero=False)
		if selected or label_numbers is not None or extra_count:
			frappe.throw(_("Label lanjutan harus dicetak terpisah dari mode otomatis atau cetak ulang."))
		if not issue:
			frappe.throw(_("Label lanjutan hanya dapat diterbitkan dari cetak Work Order."))
	# A print of already-issued labels does not allocate output, so it must not
	# depend on current Good Qty/UOM. Normal issuance keeps the packing guard.
	if not selected and append_count is None:
		_label_count(wo, extra_count)
	rows = frappe.get_all(
		MAPPING_DOCTYPE,
		filters={"work_order": wo.name},
		fields=["product_qr_serial", "label_number", "adonan_ke"],
		order_by="creation asc, name asc",
		limit_page_length=0,
	)
	serial_names = [row.product_qr_serial for row in rows]
	serials, batch_no = _mapped_serials(wo, rows)
	if append_count is not None and not serial_names:
		frappe.throw(_("Cetak label awal otomatis terlebih dahulu sebelum menambahkan label."))
	if not serial_names:
		batch = _single_batch(wo)
		batch_no = batch.name if batch else None

	if append_count is not None:
		# Appending starts strictly after the last issued ordinal, independent of
		# Good Qty's initial suggestion or any prior automatic extra count.
		_label_count(wo, 0)
		if append_count > MAX_LABELS:
			frappe.throw(_("Jumlah label lanjutan melebihi batas {0}.").format(MAX_LABELS))
		new_labels = []
		for _index in range(append_count):
			next_label_number = max((serial.label_number for serial in serials), default=0) + 1
			if next_label_number > MAX_LABEL_NUMBER:
				frappe.throw(_("Nomor urut label melebihi batas {0}.").format(MAX_LABEL_NUMBER))
			serial = frappe.get_doc(
				{"doctype": SERIAL_DOCTYPE, "item_code": wo.production_item, "batch_no": batch_no}
			).insert(ignore_permissions=True)
			frappe.get_doc(
				{
					"doctype": MAPPING_DOCTYPE,
					"work_order": wo.name,
					"product_qr_serial": serial.name,
					"label_number": next_label_number,
					"adonan_ke": wo.get("custom_adonan_ke") or None,
				}
			).insert(ignore_permissions=True)
			new_labels.append(
				frappe._dict(
					name=serial.name,
					label_number=next_label_number,
					adonan_ke=wo.get("custom_adonan_ke") or None,
					item_code=wo.production_item,
					batch_no=batch_no,
					serial_no=serial.serial_no,
					qr_payload=serial.qr_payload,
				)
			)
			serials.append(new_labels[-1])
		return _label_payload(wo, batch_no, new_labels)

	if selected:
		serial_by_label_number = {serial.label_number: serial for serial in serials}
		missing = [number for number in selected if number not in serial_by_label_number]
		if missing:
			frappe.throw(
				_("Nomor urut label {0} belum diterbitkan untuk Work Order ini.").format(", ".join(map(str, missing[:10])))
			)
		selected_labels = [serial_by_label_number[number] for number in selected]
		return _label_payload(wo, batch_no, selected_labels)

	count = _label_count(wo, extra_count)
	if issue:
		for _index in range(max(0, count - len(serial_names))):
			next_label_number = max((serial.label_number for serial in serials), default=0) + 1
			if next_label_number > MAX_LABEL_NUMBER:
				frappe.throw(_("Nomor urut label melebihi batas {0}.").format(MAX_LABEL_NUMBER))
			serial = frappe.get_doc(
				{"doctype": SERIAL_DOCTYPE, "item_code": wo.production_item, "batch_no": batch_no}
			).insert(ignore_permissions=True)
			frappe.get_doc(
				{
					"doctype": MAPPING_DOCTYPE,
					"work_order": wo.name,
					"product_qr_serial": serial.name,
					"label_number": next_label_number,
					"adonan_ke": wo.get("custom_adonan_ke") or None,
				}
			).insert(ignore_permissions=True)
			serial_names.append(serial.name)
			serials.append(
				frappe._dict(
					name=serial.name,
					label_number=next_label_number,
					adonan_ke=wo.get("custom_adonan_ke") or None,
					item_code=wo.production_item,
					batch_no=batch_no,
					serial_no=serial.serial_no,
					qr_payload=serial.qr_payload,
				)
			)
	elif len(serial_names) < count:
		frappe.throw(_("Label QR belum dibuat. Cetak terlebih dahulu dari Production Workspace."))
	return _label_payload(wo, batch_no, serials[:count])


@frappe.whitelist(methods=["POST"])
def get_existing_label_numbers(name):
	"""List issued ordinal labels for exact reprints; serial identities remain internal."""
	if not frappe.db.table_exists(SERIAL_DOCTYPE) or not frappe.db.table_exists(MAPPING_DOCTYPE):
		frappe.throw(_("Schema label Product QR belum dimigrasi."))
	wo = frappe.get_doc("Work Order", name)
	wo.check_permission("write")
	rows = frappe.get_all(
		MAPPING_DOCTYPE,
		filters={"work_order": wo.name},
		fields=["product_qr_serial", "label_number", "adonan_ke"],
		order_by="creation asc, name asc",
		limit_page_length=0,
	)
	serial_names = [row.product_qr_serial for row in rows]
	serials, _batch_no = _mapped_serials(wo, rows)
	labels = [{"label_number": row.label_number, "adonan_ke": row.adonan_ke} for row in serials]
	common_adonan = labels[0]["adonan_ke"] if labels and all(row["adonan_ke"] == labels[0]["adonan_ke"] for row in labels) else None
	return {
		"work_order": wo.name,
		"adonan_ke": common_adonan if labels else (wo.get("custom_adonan_ke") or None),
		"labels": labels,
	}


@frappe.whitelist(methods=["POST"])
def get_label_data(name, extra=0, append_count=None, label_numbers=None):
	return label_data(name, extra, issue=True, append_count=append_count, label_numbers=label_numbers)
