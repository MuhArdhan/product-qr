"""Work Order/serial ownership and immutable mapping validation."""

import frappe
from frappe import _
from frappe.model.document import Document


class WorkOrderQRLabel(Document):
	def validate(self):
		wo_item = frappe.db.get_value("Work Order", self.work_order, "production_item")
		serial = frappe.db.get_value("Product QR Serial", self.product_qr_serial, ["item_code", "batch_no"], as_dict=True)
		if not wo_item or not serial or serial.item_code != wo_item:
			frappe.throw(_("Product QR Serial must belong to the Work Order Item"))
		if serial.batch_no:
			batch = frappe.db.get_value("Batch", serial.batch_no, ["item", "reference_doctype", "reference_name"], as_dict=True)
			if not batch or (batch.item, batch.reference_doctype, batch.reference_name) != (wo_item, "Work Order", self.work_order):
				frappe.throw(_("Product QR Serial Batch must belong to the Work Order"))
		if self.is_new():
			try:
				label_number = int(self.label_number or 0)
			except (TypeError, ValueError):
				label_number = 0
			if label_number < 1:
				frappe.throw(_("Work Order QR Label needs a positive label number"))
			if frappe.db.get_value(
				self.doctype,
				{"work_order": self.work_order, "label_number": label_number},
				"name",
			):
				frappe.throw(_("Work Order QR Label number must be unique within its Work Order"))
		else:
			old = frappe.db.get_value(
				self.doctype, self.name,
				["work_order", "product_qr_serial", "label_number", "adonan_ke"],
				as_dict=True,
			)
			if old and (old.work_order, old.product_qr_serial) != (self.work_order, self.product_qr_serial):
				frappe.throw(_("Work Order QR Label cannot be reassigned"))
			if old and (old.label_number, old.adonan_ke) != (self.label_number, self.adonan_ke):
				frappe.throw(_("Work Order QR Label number and Adonan snapshot cannot be changed"))
