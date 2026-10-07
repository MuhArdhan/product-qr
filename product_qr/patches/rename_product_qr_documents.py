"""Give label documents their own IDs, preserving QR identities and native links."""

import re

import frappe
from frappe.model.naming import getseries
from frappe.model.rename_doc import rename_doc


def execute():
	DOCTYPE = "Product QR Serial"
	if not frappe.db.table_exists(DOCTYPE):
		return

	names = frappe.get_all(DOCTYPE, pluck="name", order_by="creation asc, name asc", limit_page_length=0)
	pattern = re.compile(r"PQR-([0-9]{6,})")
	last = max((int(match.group(1)) for name in names if (match := pattern.fullmatch(name))), default=0)
	# Continue after existing PQR IDs, including when the patch is run again.
	frappe.db.sql(
		"INSERT INTO `tabSeries` (`name`, `current`) VALUES (%s, %s) "
		"ON DUPLICATE KEY UPDATE `current` = GREATEST(`current`, VALUES(`current`))",
		("PQR-", last),
	)
	for old_name in names:
		if pattern.fullmatch(old_name):
			continue
		new_name = "PQR-" + getseries("PQR-", 6)
		rename_doc(
			DOCTYPE, old_name, new_name, force=True, ignore_permissions=True,
			show_alert=False, rebuild_search=False,
		)
