### Product QR

Product QR management

### Product labels

`Product QR Serial` stores a reference to an ERPNext Item and Batch, a globally
unique product serial (`PQR-00000001`, `PQR-00000002`, ...), and the exact QR value
`ITEM-BATCH-SERIAL`. The Batch must belong to the selected Item. These fields
cannot be changed after the record is created. This app does not use ERPNext's
Serial No DocType.

Open the **Product QR Serial** list and choose **Generate Labels**. Select an Item,
its Batch, and the number of physical labels. Each label creates a separate serial
record; the generated sheet opens for printing. Open any record and choose **Print
Label** to reprint its existing identity. Scanners and other apps can call
`product_qr.api.find_serial` with the complete QR value to retrieve the matching
Item, Batch, and serial without splitting on hyphens.

After updating an existing installation, run `bench --site <site> migrate` to load
the new DocType before using it.

### Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app $URL_OF_THIS_REPO --branch main
bench install-app product_qr
```

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/product_qr
pre-commit install
```

Pre-commit is configured to use the following tools for checking and formatting your code:

- ruff
- eslint
- prettier
- pyupgrade

### License

mit
