import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import qz from 'qz-tray'
import { connectQz, getExistingLabelNumbers, printLabels } from '../src/qz-tray.js'
import { labelSource, labelCountForWorkOrder, offerLabelPrint, labelPrintPrompt } from '../src/label-print-prompt.js'
import { workOrderLabelUrl } from '../src/work-order-label.js'
import { buildLayoutHTML } from '../src/label-layout.js'
import { browserLabelPrinter } from '../src/browser-print.js'

test('browser print renderer preserves media, columns and selected ordinal text', async () => {
  const html = await buildLayoutHTML({ sku: 'SKU', label_count: 3,
    labels: [5, 8, 9].map(label_number => ({ label_number, qr_value: `QR-${label_number}` }))
  }, { width: 60, height: 30, columns: 2, gap: 2 })
  assert.equal((html.match(/<section>/g) || []).length, 2)
  assert.match(html, /size:122mm 30mm/)
  for (const ordinal of [5, 8, 9]) assert.ok(html.includes(`>${ordinal}</div>`))
})

for (const failure of ['connect', 'connect-timeout', 'printer', 'print', 'data', 'direct-browser']) {
  test(`${failure}: browser print uses one request and respects failures`, async t => {
    const savedWindow = globalThis.window
    const savedStorage = globalThis.localStorage
    let requests = 0
    let browserPrints = 0
    let resolveLateConnection
    let connectionStarted
    const started = new Promise(resolve => { connectionStarted = resolve })
    const data = { sku: 'SKU', label_count: 1, labels: [{ label_number: 5, qr_value: 'ORIGINAL-QR-5' }] }
    try {
      globalThis.window = { csrf_token: 'test' }
      t.mock.method(qz.security, 'setCertificatePromise', () => {})
      t.mock.method(qz.security, 'setSignaturePromise', () => {})
      t.mock.method(qz.security, 'setSignatureAlgorithm', () => {})
      if (failure === 'connect-timeout') {
        t.mock.timers.enable({ apis: ['setTimeout'] })
        globalThis.localStorage = { getItem: () => JSON.stringify({ qzTimeout: 3 }) }
      }
      t.mock.method(qz.websocket, 'isActive', () => !['connect', 'connect-timeout'].includes(failure))
      t.mock.method(qz.websocket, 'connect', options => {
        assert.equal(options.retries, 0)
        connectionStarted()
        if (failure === 'connect-timeout') return new Promise(resolve => { resolveLateConnection = resolve })
        return Promise.reject(new Error('offline'))
      })
      t.mock.method(qz.websocket, 'disconnect', async () => {})
      t.mock.method(qz.printers, 'getDefault', async () => {
        if (failure === 'printer') throw new Error('No printer')
        return 'Printer'
      })
      t.mock.method(qz.configs, 'create', () => ({}))
      t.mock.method(qz, 'print', async () => { throw new Error('Print failed') })
      t.mock.method(console, 'error', () => {})
      t.mock.method(browserLabelPrinter, 'print', async payload => {
        assert.equal(payload, data)
        assert.equal(payload.labels[0].qr_value, 'ORIGINAL-QR-5')
        browserPrints++
      })
      t.mock.method(globalThis, 'fetch', async (_url, options) => {
        requests++
        assert.deepEqual(JSON.parse(options.body), { name: 'WO-5', extra: 0, label_numbers: [5] })
        return { ok: failure !== 'data', json: async () => ({ message: data }) }
      })
      const options = { labelNumbers: [5], ...(failure === 'direct-browser' ? { output: 'browser' } : {}) }
      const result = printLabels('WO-5', options)
      if (failure === 'connect-timeout') {
        await started
        t.mock.timers.tick(2999)
        await Promise.resolve()
        assert.equal(browserPrints, 0)
        t.mock.timers.tick(1)
      }
      if (failure === 'data') await assert.rejects(result, /Gagal mengambil/)
      else assert.deepEqual(await result, {
        [failure === 'direct-browser' ? 'browserPrint' : 'browserFallback']: true
      })
      if (failure === 'connect-timeout') {
        assert.equal(qz.websocket.disconnect.mock.callCount(), 1)
        resolveLateConnection()
        await Promise.resolve()
        assert.equal(qz.print.mock.callCount(), 0)
        assert.equal(qz.printers.getDefault.mock.callCount(), 0)
      }
      if (failure === 'direct-browser') {
        assert.equal(qz.security.setCertificatePromise.mock.callCount(), 0)
        assert.equal(qz.websocket.isActive.mock.callCount(), 0)
        assert.equal(qz.printers.getDefault.mock.callCount(), 0)
        assert.equal(qz.print.mock.callCount(), 0)
      }
      assert.equal(requests, 1)
      assert.equal(browserPrints, failure === 'data' ? 0 : 1)
    } finally {
      globalThis.window = savedWindow
      if (savedStorage === undefined) delete globalThis.localStorage
      else globalThis.localStorage = savedStorage
    }
  })
}

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

test('automatic extras, append counts and selected ordinals use separate Product QR requests', async () => {
  const saved = {
    certificate: qz.security.setCertificatePromise, signature: qz.security.setSignaturePromise,
    algorithm: qz.security.setSignatureAlgorithm, active: qz.websocket.isActive,
    printer: qz.printers.getDefault, config: qz.configs.create, print: qz.print,
    fetch: globalThis.fetch, window: globalThis.window
  }
  const data = {
    sku: 'SKU-A', batch_no: 'B-01', item_name: 'Dough Chocolate',
    manufacturing_date: '2026-10-19', expiry_date: '2026-11-18', label_count: 2,
    labels: [
      { label_number: 2, adonan_ke: 7, serial_no: 'S002', qr_value: 'SKU-A-B-01-S002' },
      { label_number: 4, adonan_ke: 7, serial_no: 'S004', qr_value: 'SKU-A-B-01-S004' }
    ]
  }
  const submitted = []
  try {
    qz.security.setCertificatePromise = () => {}
    qz.security.setSignaturePromise = () => {}
    qz.security.setSignatureAlgorithm = () => {}
    qz.websocket.isActive = () => true
    qz.printers.getDefault = async () => 'printer'
    qz.configs.create = () => ({})
    qz.print = async () => {}
    globalThis.window = { csrf_token: 'csrf-test' }
    globalThis.fetch = async (url, options) => {
      assert.equal(url, '/api/method/product_qr.wo_labels.labels.get_label_data')
      submitted.push(JSON.parse(options.body))
      return { ok: true, json: async () => ({ message: data }) }
    }
    await printLabels('WO-42', { extra: 2 })
    await printLabels('WO-42', { appendCount: 3 })
    await printLabels('WO-42', { labelNumbers: [2] })
    assert.deepEqual(submitted, [
      { name: 'WO-42', extra: 2 },
      { name: 'WO-42', extra: 0, append_count: 3 },
      { name: 'WO-42', extra: 0, label_numbers: [2] }
    ])
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

test('existing label-number lookup is an authenticated Product QR request tied to Adonan', async () => {
  const saved = { fetch: globalThis.fetch, window: globalThis.window }
  let request
  try {
    globalThis.window = { csrf_token: 'csrf-test' }
    globalThis.fetch = async (url, options) => {
      request = { url, options }
      return { ok: true, json: async () => ({ message: {
        work_order: 'WO-1', adonan_ke: 7, labels: [{ label_number: 5, adonan_ke: 7 }]
      } }) }
    }
    assert.deepEqual(await getExistingLabelNumbers('WO-1'), {
      work_order: 'WO-1', adonan_ke: 7, labels: [{ label_number: 5, adonan_ke: 7 }]
    })
    assert.equal(request.url, '/api/method/product_qr.wo_labels.labels.get_existing_label_numbers')
    assert.equal(request.options.method, 'POST')
    assert.equal(request.options.credentials, 'same-origin')
    assert.equal(request.options.headers['X-Frappe-CSRF-Token'], 'csrf-test')
    assert.deepEqual(JSON.parse(request.options.body), { name: 'WO-1' })
  } finally {
    globalThis.fetch = saved.fetch
    globalThis.window = saved.window
  }
})

test('print dialog supports Good Qty, append-after-first-print and selected ordinals', () => {
  const copy = readFileSync(new URL('../src/WorkOrderLabelDialogs.vue', import.meta.url), 'utf8')
  for (const label of [
    'Cetak label?', 'Usulan otomatis dari Good Qty dan UOM:', 'Otomatis dari Good Qty',
    'Tambah setelah cetak awal', 'Jumlah label lanjutan', 'Pilih nomor urut label untuk cetak ulang',
    'Label tambahan', 'Nanti saja', 'Ya, Cetak Label'
  ]) assert.ok(copy.includes(label))
  assert.doesNotMatch(copy, />Cetak via Browser<\/button>/)
  assert.match(copy, /class="input"/)
  assert.equal((copy.match(/<select\b/g) || []).length, 2)
  assert.equal((copy.match(/class="input label-dialog-select"/g) || []).length, 2)
  assert.match(copy, /appearance: none/)
  assert.match(copy, /border-color: var\(--accent/)
  assert.match(copy, /background-image: url\("data:image\/svg\+xml/)
  assert.match(copy, /:max="Math\.max\(0, 10000 - labelPrintPrompt\.labelCount\)"/)
  assert.match(copy, /appendCount: Number\(appendLabelCount\.value\)/)
  assert.match(copy, /id="label-number-select" v-model\.number="selectedLabelNumber"/)
  assert.match(copy, /labelNumbers: \[Number\(selectedLabelNumber\.value\)\]/)
  assert.doesNotMatch(copy, /label-number-search|selectedLabelNumbers|type="checkbox"/)
  assert.doesNotMatch(copy, /Masukkan jumlah manual|manual-label-count|totalCount/)
  assert.match(copy, /getExistingLabelNumbers/)
  assert.match(copy, /:disabled="labelsLoading \|\| !existingLabels\.length"/)
  assert.match(copy, /Adonan ke/)
  assert.match(copy, /aria-labelledby="wo-label-error-title"/)
  assert.doesNotMatch(copy, /id="error-dialog-title"/)
  assert.doesNotMatch(copy, /LabelLayoutSettings|Pengaturan layout label/)
})

test('label settings reuse host panels and fields without preview or toggles', () => {
  const source = readFileSync(new URL('../src/LabelLayoutSettings.vue', import.meta.url), 'utf8')
  for (const style of ['panel settings-panel pqr-layout', 'panel-head', 'panel-body', 'panel-foot', 'settings-block', 'settings-control', 'form-grid cols2', 'field']) {
    assert.ok(source.includes(`class="${style}"`), style)
  }
  assert.doesNotMatch(source, /<details|<summary|#cbd5e1|#b3261e|pqr-layout-grid/)
  assert.doesNotMatch(source, /<iframe|preview|role="switch"|type="checkbox"|buildLayoutHTML|onBeforeUnmount|watch\(/i)
})
