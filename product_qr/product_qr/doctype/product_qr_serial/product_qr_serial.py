import frappe
from frappe import _
from frappe.model.document import Document


class ProductQRSerial(Document):
	def before_validate(self):
		# The document name is allocated by the global naming series before validation.
		if self.is_new():
			self.serial_no = self.name
			self.qr_payload = f"{self.item_code}-{self.batch_no}-{self.serial_no}"

	def validate(self):
		if not frappe.db.exists("Item", self.item_code):
			frappe.throw(_("Item {0} does not exist").format(self.item_code))

		batch_item = frappe.db.get_value("Batch", self.batch_no, "item")
		if not batch_item:
			frappe.throw(_("Batch {0} does not exist").format(self.batch_no))
		if batch_item != self.item_code:
			frappe.throw(_("Batch {0} belongs to Item {1}").format(self.batch_no, batch_item))

		if self.serial_no != self.name:
			frappe.throw(_("Product Serial must match the document name"))
		if self.qr_payload != f"{self.item_code}-{self.batch_no}-{self.serial_no}":
			frappe.throw(_("QR Value does not match Item, Batch, and Product Serial"))

		if not self.is_new():
			original = frappe.db.get_value(
				self.doctype, self.name, ["item_code", "batch_no", "serial_no", "qr_payload"], as_dict=True
			)
			if original and any(self.get(field) != original[field] for field in original):
				frappe.throw(_("Product QR Serial fields cannot be changed after creation"))
