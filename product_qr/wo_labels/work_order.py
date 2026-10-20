"""Label-specific WO helpers copied from Production App, without app imports."""

import math

import frappe
from frappe import _
from frappe.utils import flt


def skips_prepacking(item_code):
	return bool(item_code and frappe.get_cached_value("Item", item_code, "custom_skip_prepacking"))


def _enrich_units(rows):
	"""Keep the label count's existing stock/display UOM resolution unchanged."""
	items = {}
	for row in rows:
		code = row.get("production_item")
		if code not in items:
			try:
				items[code] = frappe.get_cached_doc("Item", code)
			except frappe.DoesNotExistError:
				items[code] = None
		item = items[code]
		if item is None:
			row["stock_uom"] = None
			row["display_uom"] = row.get("custom_uom")
			row["display_conversion_factor"] = None
			row["stock_uom_whole_number"] = False
			row["uom_warning"] = None
			continue
		stock = item.stock_uom
		alternate = item.get("custom_default_inventory_unit_of_measure") or row.get("custom_uom") or stock
		factor = 1.0 if alternate == stock else None
		if alternate != stock:
			conversions = item.uoms
			if item.variant_of:
				conversions = list(conversions)
				try:
					conversions += list(frappe.get_cached_doc("Item", item.variant_of).uoms)
				except frappe.DoesNotExistError:
					pass
			for conversion in conversions:
				if conversion.uom == alternate:
					value = flt(conversion.conversion_factor)
					factor = value if math.isfinite(value) and value > 0 else None
					break
		row["stock_uom"] = stock
		row["display_uom"] = alternate
		row["display_conversion_factor"] = factor
		row["stock_uom_whole_number"] = bool(frappe.get_cached_value("UOM", stock, "must_be_whole_number"))
		row["uom_warning"] = (
			_("Konversi {0} ke {1} belum valid di Item {2}; gunakan {1}.").format(alternate, stock, code)
			if factor is None else None
		)
