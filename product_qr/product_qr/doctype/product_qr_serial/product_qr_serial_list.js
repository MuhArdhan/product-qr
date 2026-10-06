frappe.listview_settings["Product QR Serial"] = {
	onload(listview) {
		if (!frappe.model.can_create("Product QR Serial")) return;

		listview.page.add_inner_button(__("Generate Labels"), () => {
			const dialog = new frappe.ui.Dialog({
				title: __("Generate Product QR Labels"),
				fields: [
					{ fieldname: "item_code", fieldtype: "Link", options: "Item", label: __("Item"), reqd: 1 },
					{
						fieldname: "batch_no", fieldtype: "Link", options: "Batch", label: __("Batch"),
						get_query: () => ({ filters: { item: dialog.get_value("item_code") || "" } }),
					},
					{ fieldname: "quantity", fieldtype: "Int", label: __("Number of Labels"), default: 1, reqd: 1 },
				],
				primary_action_label: __("Generate and Print"),
				primary_action: async (values) => {
					const print_window = window.open("", "_blank");
					try {
						const created = await frappe.call({
							method: "product_qr.api.create_labels",
							args: values,
						});
						const names = created.message;
						dialog.hide();
						listview.refresh();
						frappe.show_alert(__("{0} product labels created", [names.length]));
						if (print_window) {
							const result = await frappe.call({
								method: "product_qr.api.get_label_html",
								args: { names },
							});
							print_window.onload = () => print_window.print();
							print_window.document.write(result.message);
							print_window.document.close();
							print_window.focus();
						} else {
							frappe.msgprint(__("Labels created. Allow pop-ups to print them; each label can also be printed from its record."));
						}
					} catch (error) {
						if (print_window) print_window.close();
						throw error;
					}
				},
			});
			dialog.show();
		});
	},
};
