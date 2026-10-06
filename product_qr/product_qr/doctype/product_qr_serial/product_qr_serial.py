import hashlib
import re

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.model.naming import getseries


def _next_batch_serial(item_code, batch_no):
	"""Allocate S001, S002, ... per Item and Batch (or per Item without Batch)."""
	# Lock a stable native row while initializing the counter from existing labels.
	lock_doctype, lock_name = ("Batch", batch_no) if batch_no else ("Item", item_code)
	if not frappe.db.get_value(lock_doctype, lock_name, "name", for_update=True):
		frappe.throw(_("{0} {1} does not exist").format(lock_doctype, lock_name))
	key = "PQR-BATCH-" + hashlib.sha256(f"{item_code}\0{batch_no or 'NOBATCH'}".encode()).hexdigest()[:32]
	if not frappe.db.sql("SELECT `current` FROM `tabSeries` WHERE `name` = %s", (key,)):
		prior = frappe.get_all(
			"Product QR Serial",
			filters={"item_code": item_code, "batch_no": batch_no if batch_no else ("is", "not set"), "serial_no": ("like", "S%")},
			pluck="serial_no",
			limit_page_length=0,
		)
		last = max((int(match.group(1)) for value in prior if (match := re.fullmatch(r"S([0-9]+)", value))), default=0)
		if last:
			frappe.db.sql("INSERT INTO `tabSeries` (`name`, `current`) VALUES (%s, %s)", (key, last))
	return "S" + getseries(key, 3)


class ProductQRSerial(Document):
	def before_validate(self):
		# The document name remains globally unique; QR serial numbers restart per Batch.
		if self.is_new():
			self.serial_no = _next_batch_serial(self.item_code, self.batch_no)
			self.qr_payload = f"{self.item_code}-{self.batch_no or 'NOBATCH'}-{self.serial_no}"

	def validate(self):
		if not frappe.db.exists("Item", self.item_code):
			frappe.throw(_("Item {0} does not exist").format(self.item_code))

		if self.batch_no:
			batch_item = frappe.db.get_value("Batch", self.batch_no, "item")
			if not batch_item:
				frappe.throw(_("Batch {0} does not exist").format(self.batch_no))
			if batch_item != self.item_code:
				frappe.throw(_("Batch {0} belongs to Item {1}").format(self.batch_no, batch_item))

		if self.qr_payload != f"{self.item_code}-{self.batch_no or 'NOBATCH'}-{self.serial_no}":
			frappe.throw(_("QR Value does not match Item, Batch, and Product Serial"))

		if not self.is_new():
			original = frappe.db.get_value(
				self.doctype, self.name, ["item_code", "batch_no", "serial_no", "qr_payload"], as_dict=True
			)
			if original and any(self.get(field) != original[field] for field in original):
				frappe.throw(_("Product QR Serial fields cannot be changed after creation"))
