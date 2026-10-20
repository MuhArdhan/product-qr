// Frozen pre-settings output for a single issued label. Do not derive from the
// renderer: this is the independent byte-for-byte compatibility reference.
export const originalData = {
  sku: 'SKU-A', item_name: 'Bread', item_name_main: 'Bread', item_name_prefix: '',
  manufacturing_date: '2026-10-19', expiry_date: '2026-11-18', label_count: 1,
  labels: [{ qr_value: 'SKU-A-B01-S001', serial_no: 'S001' }]
}

export const originalZpl = `^XA
^PW800
^LL160
^FO355,28^A0N,18,18^FB40,1,0,R^FD1^FS
^FO356,28^A0N,18,18^FB40,1,0,R^FD1^FS
^FO68,32^BQN,2,4^FDQA,SKU-A-B01-S001^FS
^FO192,32^A0N,26,26^FDBread^FS
^FO193,32^A0N,26,26^FDBread^FS
^FO192,62^A0N,21,21^FDSKU : SKU-A^FS
^FO193,62^A0N,21,21^FDSKU : SKU-A^FS
^FO192,86^A0N,21,21^FDMFG : 19-10-26^FS
^FO193,86^A0N,21,21^FDMFG : 19-10-26^FS
^FO192,110^A0N,21,21^FDEXP : 18-11-26^FS
^FO193,110^A0N,21,21^FDEXP : 18-11-26^FS
^XZ
`

export const originalDoughZpl = `^XA
^PW800
^LL160
^FO355,28^A0N,18,18^FB40,1,0,R^FD1^FS
^FO356,28^A0N,18,18^FB40,1,0,R^FD1^FS
^FO68,32^BQN,2,4^FDQA,SKU-A-B01-S001^FS
^FO192,32^A0N,18,18^FDDough^FS
^FO193,32^A0N,18,18^FDDough^FS
^FO192,52^A0N,26,26^FDChocolate^FS
^FO193,52^A0N,26,26^FDChocolate^FS
^FO192,80^A0N,21,21^FDSKU : SKU-A^FS
^FO193,80^A0N,21,21^FDSKU : SKU-A^FS
^FO192,104^A0N,21,21^FDMFG : 19-10-26^FS
^FO193,104^A0N,21,21^FDMFG : 19-10-26^FS
^FO192,128^A0N,21,21^FDEXP : 18-11-26^FS
^FO193,128^A0N,21,21^FDEXP : 18-11-26^FS
^XZ
`
