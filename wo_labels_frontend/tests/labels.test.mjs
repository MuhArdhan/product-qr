import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import qz from 'qz-tray'
import { connectQz, printLabels } from '../src/qz-tray.js'
import { labelSource, labelCountForWorkOrder, offerLabelPrint, labelPrintPrompt } from '../src/label-print-prompt.js'
import { workOrderLabelUrl } from '../src/work-order-label.js'

const base = { displayUom: 'Pcs', stockUom: 'Pcs', qtyInPack: 1 }

test('packing source and count retain normal and skip-prepacking rules', () => {
  const wo = { ...base, prepacking: { goodQty: 40 }, postpacking: { goodQty: 38 } }
  assert.equal(labelSource(wo), wo.prepacking)
  assert.equal(labelCountForWorkOrder(wo), 40)
  assert.equal(labelCountForWorkOrder({ ...wo, skipPrepacking: true }), 38)
  assert.equal(labelCountForWorkOrder({ ...wo, displayUom: 'Pack', qtyInPack: 6 }), 7)
})

test('shared prompt can be used by button and after-save host adapters', () => {
  offerLabelPrint('WO-1', 7, 'Pre-Packing')
  assert.deepEqual({ ...labelPrintPrompt }, { workOrder: 'WO-1', labelCount: 7, afterSave: 'Pre-Packing' })
  offerLabelPrint('WO-2', 3)
  assert.equal(labelPrintPrompt.afterSave, '')
})

test('browser URL uses namespaced print route, no takeover of the existing route', () => {
  assert.equal(workOrderLabelUrl('WO / 1'), '/product_qr_work_order_label?name=WO%20%2F%201')
  assert.match(workOrderLabelUrl('WO-1', 2), /&extra=2$/)
})

test('certificate/signing requests only target Product QR endpoints', async () => {
  const saved = {
    certificate: qz.security.setCertificatePromise, signature: qz.security.setSignaturePromise,
    algorithm: qz.security.setSignatureAlgorithm, active: qz.websocket.isActive,
    fetch: globalThis.fetch, window: globalThis.window
  }
  let certificate, signature, algorithm
  const calls = []
  try {
    qz.security.setCertificatePromise = fn => { certificate = fn }
    qz.security.setSignaturePromise = fn => { signature = fn }
    qz.security.setSignatureAlgorithm = value => { algorithm = value }
    qz.websocket.isActive = () => true
    globalThis.window = { csrf_token: 'csrf-test' }
    globalThis.fetch = async (url, options) => {
      calls.push({ url, options })
      return { ok: true, json: async () => ({ message: calls.length === 1 ? 'CERT' : 'SIGNED' }) }
    }
    await connectQz('WO / 1')
    assert.equal(await certificate(), 'CERT')
    assert.equal(await signature('a'.repeat(64)), 'SIGNED')
    assert.equal(algorithm, 'SHA512')
    assert.match(calls[0].url, /product_qr\.wo_labels\.qz_signing\.certificate\?work_order=WO%20%2F%201$/)
    assert.match(calls[1].url, /product_qr\.wo_labels\.qz_signing\.sign$/)
    assert.equal(calls[1].options.headers['X-Frappe-CSRF-Token'], 'csrf-test')
    assert.deepEqual(JSON.parse(calls[1].options.body), { work_order: 'WO / 1', request: 'a'.repeat(64) })
  } finally {
    qz.security.setCertificatePromise = saved.certificate
    qz.security.setSignaturePromise = saved.signature
    qz.security.setSignatureAlgorithm = saved.algorithm
    qz.websocket.isActive = saved.active
    globalThis.fetch = saved.fetch
    globalThis.window = saved.window
  }
})

test('printing retains unique QR, two-column ZPL and odd last row', async () => {
  const saved = {
    certificate: qz.security.setCertificatePromise, signature: qz.security.setSignaturePromise,
    algorithm: qz.security.setSignatureAlgorithm, active: qz.websocket.isActive,
    printer: qz.printers.getDefault, config: qz.configs.create, print: qz.print,
    fetch: globalThis.fetch, window: globalThis.window
  }
  const data = {
    sku: 'SKU-A', batch_no: 'B-01', item_name_prefix: 'Dough', item_name_main: 'Chocolate',
    manufacturing_date: '2026-10-19', expiry_date: '2026-11-18', label_count: 3,
    labels: [1, 2, 3].map(n => ({ serial_no: `S00${n}`, qr_value: `SKU-A-B-01-S00${n}` }))
  }
  let printed
  try {
    qz.security.setCertificatePromise = () => {}
    qz.security.setSignaturePromise = () => {}
    qz.security.setSignatureAlgorithm = () => {}
    qz.websocket.isActive = () => true
    qz.printers.getDefault = async () => 'printer'
    qz.configs.create = () => ({})
    qz.print = async (_config, jobs) => { printed = jobs }
    globalThis.window = { csrf_token: 'csrf-test' }
    globalThis.fetch = async (url, options) => {
      assert.equal(url, '/api/method/product_qr.wo_labels.labels.get_label_data')
      assert.deepEqual(JSON.parse(options.body), { name: 'WO-1', extra: 0 })
      return { ok: true, json: async () => ({ message: data }) }
    }
    await printLabels('WO-1')
    assert.equal(printed.length, 2)
    assert.match(printed[0], /^\^XA\n\^PW800\n\^LL160/)
    assert.match(printed[0], /SKU-A-B-01-S001/)
    assert.match(printed[0], /SKU-A-B-01-S002/)
    assert.match(printed[0], /\^FO468,32\^BQN,2,4/)
    assert.match(printed[1], /SKU-A-B-01-S003/)
    assert.doesNotMatch(printed[1], /S001|S002/)
    assert.match(printed[0], /EXP : 18-11-26/)
  } finally {
    qz.security.setCertificatePromise = saved.certificate
    qz.security.setSignaturePromise = saved.signature
    qz.security.setSignatureAlgorithm = saved.algorithm
    qz.websocket.isActive = saved.active
    qz.printers.getDefault = saved.printer
    qz.configs.create = saved.config
    qz.print = saved.print
    globalThis.fetch = saved.fetch
    globalThis.window = saved.window
  }
})

test('print confirmation markup retains its labels and avoids host error-title ID collisions', () => {
  const copy = readFileSync(new URL('../src/WorkOrderLabelDialogs.vue', import.meta.url), 'utf8')
  for (const label of ['Cetak label?', 'Label sesuai Good Qty:', 'Label tambahan', 'Nanti saja', 'Ya, Cetak Label']) assert.ok(copy.includes(label))
  assert.match(copy, /class="input"/)
  assert.match(copy, /max="Math\.max\(0, 10000 - labelPrintPrompt\.labelCount\)"/)
  assert.match(copy, /aria-labelledby="wo-label-error-title"/)
  assert.doesNotMatch(copy, /id="error-dialog-title"/)
})
