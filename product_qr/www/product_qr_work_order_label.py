"""Namespaced copy of the existing read-only label print page (not navigation)."""

from base64 import b64encode
from io import BytesIO

import frappe
from frappe import _
from pyqrcode import create as create_qr

from product_qr.wo_labels.labels import label_data


def get_context(context):
	name = frappe.form_dict.get("name")
	if not name:
		frappe.throw(_("Pilih Work Order dulu."))
	data = label_data(name, frappe.form_dict.get("extra") or 0)
	labels = []
	for row in data["labels"]:
		stream = BytesIO()
		create_qr(row["qr_value"]).svg(stream, scale=4, quiet_zone=0)
		labels.append({
			"serial_no": row["serial_no"],
			"qr_value": row["qr_value"],
			"qr_svg_base64": b64encode(stream.getvalue()).decode("ascii"),
		})
	context.no_cache = 1
	for key, value in data.items():
		context[key] = value
	context.labels = labels
	return context
