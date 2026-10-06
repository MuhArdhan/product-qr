from html import escape
from io import BytesIO

import frappe
from frappe import _
from pyqrcode import create as create_qr

DOCTYPE = "Product QR Serial"
MAX_LABELS = 500


@frappe.whitelist(methods=["POST"])
def create_labels(item_code, batch_no, quantity):
	"""Create one globally unique product serial for each physical label."""
	if not frappe.has_permission(DOCTYPE, "create"):
		frappe.throw(_("Not permitted to create product labels"), frappe.PermissionError)

	if isinstance(quantity, bool) or not str(quantity).isdecimal():
		frappe.throw(_("Quantity must be a whole number"))
	quantity = int(quantity)
	if not 1 <= quantity <= MAX_LABELS:
		frappe.throw(_("Quantity must be between 1 and {0}").format(MAX_LABELS))

	# Validate before allocating any serial numbers. The DocType validates again on insert.
	if not frappe.db.exists("Item", item_code):
		frappe.throw(_("Item {0} does not exist").format(item_code))
	if frappe.db.get_value("Batch", batch_no, "item") != item_code:
		frappe.throw(_("Batch {0} does not belong to Item {1}").format(batch_no, item_code))

	serials = []
	for _ in range(quantity):
		doc = frappe.get_doc({"doctype": DOCTYPE, "item_code": item_code, "batch_no": batch_no})
		doc.insert()
		serials.append(doc.name)
	return serials


@frappe.whitelist()
def find_serial(qr_value):
	"""Resolve the complete scanned value; hyphens in Item/Batch need no parsing."""
	if not frappe.has_permission(DOCTYPE, "read"):
		frappe.throw(_("Not permitted to read product labels"), frappe.PermissionError)
	name = frappe.db.get_value(DOCTYPE, {"qr_payload": qr_value}, "name")
	if not name:
		return None
	doc = frappe.get_doc(DOCTYPE, name)
	doc.check_permission("read")
	return {
		"serial_no": doc.serial_no,
		"item_code": doc.item_code,
		"batch_no": doc.batch_no,
		"qr_value": doc.qr_payload,
	}


@frappe.whitelist(methods=["POST"])
def get_label_html(names):
	"""Return a self-contained printable sheet for existing serials."""
	if not frappe.has_permission(DOCTYPE, "read"):
		frappe.throw(_("Not permitted to read product labels"), frappe.PermissionError)

	names = frappe.parse_json(names) if isinstance(names, str) else names
	if not isinstance(names, list) or not 1 <= len(names) <= MAX_LABELS:
		frappe.throw(_("Select between 1 and {0} labels").format(MAX_LABELS))
	if any(not isinstance(name, str) for name in names):
		frappe.throw(_("Invalid product serial list"))

	labels = []
	for name in names:
		doc = frappe.get_doc(DOCTYPE, name)
		doc.check_permission("read")
		stream = BytesIO()
		create_qr(doc.qr_payload).svg(stream, scale=4, omithw=True)
		svg = stream.getvalue().decode("utf-8")
		labels.append(
			'<section class="label">'
			f'<div class="qr">{svg}</div>'
			f'<div class="details"><strong>{escape(doc.item_code)}</strong>'
			f'<span>Batch: {escape(doc.batch_no)}</span>'
			f'<span>Serial: {escape(doc.serial_no)}</span></div>'
			'</section>'
		)

	return (
		'<!doctype html><html><head><meta charset="utf-8"><title>Product QR Labels</title>'
		'<style>@page{size:A4;margin:10mm}body{font-family:Arial,sans-serif;margin:0}'
		'.sheet{display:grid;grid-template-columns:1fr 1fr;gap:4mm}'
		'.label{box-sizing:border-box;display:flex;align-items:center;gap:4mm;min-height:35mm;'
		'padding:3mm;border:1px solid #ccc;break-inside:avoid}'
		'.qr svg{width:27mm;height:27mm}.details{display:flex;flex-direction:column;gap:2mm;'
		'font-size:9pt;overflow-wrap:anywhere}'
		'@media print{.label{border-color:#ddd}}</style></head><body><main class="sheet">'
		+ "".join(labels)
		+ "</main></body></html>"
	)
