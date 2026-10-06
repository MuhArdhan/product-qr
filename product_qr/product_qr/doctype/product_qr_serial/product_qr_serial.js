frappe.ui.form.on("Product QR Serial", {
	setup(frm) {
		frm.set_query("batch_no", () => ({ filters: { item: frm.doc.item_code || "" } }));
	},
	refresh(frm) {
		if (frm.is_new() || !frappe.model.can_read("Product QR Serial")) return;
		frm.add_custom_button(__("Print Label"), async () => {
			const print_window = window.open("", "_blank");
			if (!print_window) {
				frappe.msgprint(__("Allow pop-ups to print the label."));
				return;
			}
			try {
				const result = await frappe.call({
					method: "product_qr.api.get_label_html",
					args: { names: [frm.doc.name] },
				});
				print_window.onload = () => print_window.print();
				print_window.document.write(result.message);
				print_window.document.close();
				print_window.focus();
			} catch (error) {
				print_window.close();
				throw error;
			}
		});
	},
});
