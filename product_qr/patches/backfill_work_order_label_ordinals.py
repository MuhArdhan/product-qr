"""Persist stable per-Work-Order label numbers and Adonan snapshots."""

import frappe


def execute():
	doctype = "Work Order QR Label"
	if not frappe.db.table_exists(doctype):
		return

	rows = frappe.get_all(
		doctype,
		fields=["name", "work_order", "label_number", "adonan_ke"],
		order_by="work_order asc, creation asc, name asc",
		limit_page_length=0,
	)
	work_orders = {}
	for row in rows:
		work_orders.setdefault(row.work_order, []).append(row)

	for work_order, mappings in work_orders.items():
		adonan_ke = frappe.db.get_value("Work Order", work_order, "custom_adonan_ke") or None
		last_number = max((row.label_number or 0 for row in mappings), default=0)
		for row in mappings:
			values = {}
			if not row.label_number or row.label_number < 1:
				last_number += 1
				values["label_number"] = last_number
			if row.adonan_ke is None:
				values["adonan_ke"] = adonan_ke
			if values:
				frappe.db.set_value(doctype, row.name, values, update_modified=False)
