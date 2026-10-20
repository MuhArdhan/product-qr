import test from 'node:test'
import assert from 'node:assert/strict'
import qz from 'qz-tray'
import { LAYOUT_KEY, LAYOUT_DEFAULTS, normalizeLayout, loadLayout, saveLayout, resetLayout, buildLayoutZpl, buildLayoutHTML, SAMPLE_LABEL_DATA } from '../src/label-layout.js'
import { findLabelPrinters, inspectLabelPrinters, printTestLabel, printLabels } from '../src/qz-tray.js'
import { describeLabelPrinter } from '../src/label-printer-status.js'
import { originalData, originalZpl, originalDoughZpl } from './fixtures/original-zpl.js'

function storage() {
  const values = new Map()
  return { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v), removeItem: k => values.delete(k) }
}

test('QZ timeout defaults, clamps, persists and resets without changing label output', () => {
  for (const value of [undefined, null, '', 'abc', Infinity, NaN]) {
    assert.equal(normalizeLayout({ qzTimeout: value }).qzTimeout, 8)
  }
  assert.equal(normalizeLayout({ qzTimeout: 0 }).qzTimeout, 1)
  assert.equal(normalizeLayout({ qzTimeout: 100 }).qzTimeout, 60)
  assert.equal(normalizeLayout({ qzTimeout: 3.6 }).qzTimeout, 4)
  const s = storage()
  s.setItem(LAYOUT_KEY, JSON.stringify({ width: 60 }))
  assert.equal(loadLayout(s).qzTimeout, 8)
  assert.equal(saveLayout({ qzTimeout: 12, width: 60 }, s).qzTimeout, 12)
  assert.equal(loadLayout(s).qzTimeout, 12)
  assert.equal(loadLayout(s).width, 60)
  assert.deepEqual(buildLayoutZpl(originalData, { qzTimeout: 12 }), [originalZpl])
  resetLayout(s)
  assert.equal(normalizeLayout(loadLayout(s)).qzTimeout, 8)
})

test('preview and test-print sample is Dough Ropi Butter without a TEST name suffix', () => {
  assert.equal(SAMPLE_LABEL_DATA.item_name, 'Dough Ropi Butter')
  assert.equal(SAMPLE_LABEL_DATA.item_name_prefix, 'Dough')
  assert.equal(SAMPLE_LABEL_DATA.item_name_main, 'Ropi Butter')
  assert.doesNotMatch(SAMPLE_LABEL_DATA.item_name, /test/i)
})

test('original hardcoded ZPL is the default before save, after save and after reset', () => {
  const s = storage()
  const expected = [originalZpl]
  assert.deepEqual(buildLayoutZpl(originalData, loadLayout(s)), expected)
  saveLayout(LAYOUT_DEFAULTS, s)
  assert.deepEqual(buildLayoutZpl(originalData, loadLayout(s)), expected)
  saveLayout({ ...LAYOUT_DEFAULTS, printer: 'Dedicated label printer' }, s)
  assert.deepEqual(buildLayoutZpl(originalData, loadLayout(s)), expected)
  resetLayout(s)
  assert.deepEqual(buildLayoutZpl(originalData, loadLayout(s)), expected)
})

test('original Dough prefix and double-strike anchors are preserved', () => {
  const data = { ...originalData, item_name_prefix: 'Dough', item_name_main: 'Chocolate' }
  assert.deepEqual(buildLayoutZpl(data, LAYOUT_DEFAULTS), [originalDoughZpl])
  const hidden = buildLayoutZpl(data, { showSku: false })[0]
  assert.equal(hidden, originalDoughZpl.replace(/^.*\^FDSKU : SKU-A\^FS\n/gm, ''))
})

test('overrides change only the requested legacy layout properties', () => {
  const base = originalZpl
  assert.equal(buildLayoutZpl(originalData, { height: 30 })[0], base.replace('^LL160', '^LL240'))
  assert.equal(buildLayoutZpl(originalData, { columns: 1 })[0], base.replace('^PW800', '^PW400'))
  assert.equal(buildLayoutZpl(originalData, { width: 60 })[0], base.replace('^PW800', '^PW960'))
  const moved = buildLayoutZpl(originalData, { margin: 1 })[0]
  assert.match(moved, /\^FO76,40\^BQN,2,4/)
  assert.match(moved, /\^FO200,40\^A0N,26,26/)
  assert.match(moved, /SKU-A-B01-S001/)
})

test('layout persistence is opt-in, roundtrips, handles corruption and reset', () => {
  const s = storage()
  assert.equal(loadLayout(s), null)
  const c = saveLayout({ ...LAYOUT_DEFAULTS, printer: 'LABEL', width: 60, columns: 1 }, s)
  assert.deepEqual(loadLayout(s), c)
  s.setItem(LAYOUT_KEY, '{invalid')
  assert.equal(loadLayout(s), null)
  s.setItem(LAYOUT_KEY, 'null')
  assert.equal(loadLayout(s), null)
  s.setItem(LAYOUT_KEY, '[]')
  assert.equal(loadLayout(s), null)
  saveLayout(c, s)
  // Previously saved custom values are not silently replaced by new defaults.
  saveLayout({ height: 30, margin: 2, fontSize: 7, productFontSize: 10, lineHeight: 1.1 }, s)
  assert.equal(loadLayout(s).height, 30)
  assert.equal(loadLayout(s).fontSize, 7)
  resetLayout(s)
  assert.equal(loadLayout(s), null)
  assert.throws(() => saveLayout(c, { setItem() { throw new Error('Storage blocked') } }), /blocked/)
})

test('normalization limits unsafe settings and defaults come from original ZPL', () => {
  const c = normalizeLayout({ width: -1, height: Infinity, columns: 100, dpi: 999,
    margin: 100, qrSize: 100, align: 'left; color:red', fontSize: '', footer: 'x'.repeat(1000) })
  assert.equal(c.width, 30)
  assert.equal(c.height, 20)
  assert.equal(c.columns, 3)
  assert.equal(c.dpi, 203)
  assert.equal(c.align, 'left')
  assert.equal(c.fontSize, 7.45)
  assert.equal(c.footer.length, 100)
  assert.equal(c.margin, 8)
  assert.equal(LAYOUT_DEFAULTS.margin, 0)
  assert.equal(LAYOUT_DEFAULTS.qrSize, 16)
  assert.deepEqual(normalizeLayout(null), { ...LAYOUT_DEFAULTS })
})

test('configured ZPL uses physical geometry, columns, flags, escaped text and unchanged QR identities', () => {
  const data = { ...SAMPLE_LABEL_DATA, sku: 'SKU^XZ', item_name_prefix: '', item_name_main: 'Name~JS', labels: [1, 2, 3].map(n => ({ qr_value: `SKU_BATCH_S00${n}` })) }
  const jobs = buildLayoutZpl(data, { width: 60, height: 40, columns: 2, gap: 2, dpi: 300, qrSize: 20, showMfg: false, footer: '^XA' })
  assert.equal(jobs.length, 2)
  assert.match(jobs[0], /\^PW1442\n\^LL472/)
  assert.match(jobs[0], /SKU_5FBATCH_5FS001/)
  assert.match(jobs[0], /SKU_5FBATCH_5FS002/)
  assert.match(jobs[1], /SKU_5FBATCH_5FS003/)
  assert.doesNotMatch(jobs[1], /S001|S002/)
  assert.match(jobs[0], /SKU_5EXZ/)
  assert.match(jobs[0], /Name_7EJS/)
  assert.match(jobs[0], /_5EXA/)
  assert.doesNotMatch(jobs[0], /MFG :/)
  assert.match(jobs[0], /EXP :/)
  assert.equal(buildLayoutZpl(data, { columns: 1 }).length, 3)
})

test('adjusting QR changes only its scale, never text position or payload', () => {
  const data = { ...SAMPLE_LABEL_DATA, labels: [{ qr_value: 'SKU-BATCH-S001' }] }
  const original = buildLayoutZpl(data, {})[0]
  const adjusted = buildLayoutZpl(data, { qrSize: 20 })[0]
  assert.match(original, /\^FO68,32\^BQN,2,4\^FDQA,SKU-BATCH-S001/)
  assert.match(adjusted, /\^FO68,32\^BQN,2,5\^FDQA,SKU-BATCH-S001/)
  assert.match(adjusted, /^\^XA\n\^PW800\n\^LL160/)
  assert.match(adjusted, /\^FO192,32\^A0N/)
})

test('specific reprints retain their original label ordinal in ZPL and browser output', async () => {
  const data = {
    ...SAMPLE_LABEL_DATA,
    labels: [
      { label_number: 5, qr_value: 'SKU-BATCH-S005' },
      { label_number: 2, qr_value: 'SKU-BATCH-S002' }
    ]
  }
  const zpl = buildLayoutZpl(data, { columns: 2 })[0]
  assert.match(zpl, /\^FO355,28\^A0N,18,18\^FB40,1,0,R\^FD5\^FS/)
  assert.match(zpl, /\^FO755,28\^A0N,18,18\^FB40,1,0,R\^FD2\^FS/)
  const html = await buildLayoutHTML(data, { columns: 2 })
  assert.match(html, />5<\/div>/)
  assert.match(html, />2<\/div>/)
})

test('left QR and right text offsets are independent and preserve the default golden', () => {
  const left = buildLayoutZpl(originalData, { leftX: 1, leftY: -1 })[0]
  assert.equal(left, originalZpl.replace('^FO68,32^BQN', '^FO76,24^BQN'))
  const right = buildLayoutZpl(originalData, { rightX: 1, rightY: 1 })[0]
  const expected = originalZpl.replace(/\^FO(\d+),(\d+)\^A0N/g, (_match, x, y) => `^FO${Number(x) + 8},${Number(y) + 8}^A0N`)
  assert.equal(right, expected)
  const negative = buildLayoutZpl(originalData, { leftX: -50, leftY: -50, rightX: -50, rightY: -50 })[0]
  assert.match(negative, /\^FO0,0\^BQN/)
  assert.doesNotMatch(negative, /\^FO-/)
})

test('right content supports width, product wrapping, prefix size/visibility and single strike', () => {
  const wrapped = buildLayoutZpl(originalData, { textWidth: 20, nameLines: 2 })[0]
  assert.match(wrapped, /\^FO192,32\^A0N,26,26\^FB160,2,0,L\^FDBread/)
  assert.match(wrapped, /\^FO192,88\^A0N,21,21/)
  const data = { ...originalData, item_name_prefix: 'Dough', item_name_main: 'Chocolate' }
  assert.equal(buildLayoutZpl(data, { showPrefix: false })[0], originalDoughZpl.replace(/^.*\^FDDough\^FS\n/gm, ''))
  const prefix = buildLayoutZpl(data, { prefixFontSize: 8 })[0]
  assert.match(prefix, /\^FO192,32\^A0N,23,23\^FDDough/)
  assert.match(prefix, /\^FO355,28\^A0N,18,18/)
  const thin = buildLayoutZpl(originalData, { bold: false })[0]
  assert.doesNotMatch(thin, /\^FO193,|\^FO356,/)
  assert.match(thin, /\^FO192,32\^A0N,26,26\^FDBread/)
  assert.match(thin, /\^FO68,32\^BQN,2,4/)
})

test('side settings are normalized, saved and restored without discarding older overrides', () => {
  const s = storage()
  const saved = saveLayout({ leftX: 1.5, leftY: -1, rightX: 2, rightY: 3, textWidth: 20,
    nameLines: 2, prefixFontSize: 8, showPrefix: false, bold: false }, s)
  assert.deepEqual(loadLayout(s), saved)
  const invalid = normalizeLayout({ leftX: Infinity, leftY: -999, rightX: 999, rightY: '',
    nameLines: 99, textWidth: '<script>', prefixFontSize: -1 })
  assert.equal(invalid.leftX, 0)
  assert.equal(invalid.leftY, -50)
  assert.equal(invalid.rightX, 50)
  assert.equal(invalid.rightY, 0)
  assert.equal(invalid.textWidth, 0)
  assert.equal(invalid.nameLines, 4)
  assert.equal(invalid.prefixFontSize, 0)
  resetLayout(s)
  assert.deepEqual(buildLayoutZpl(originalData, loadLayout(s)), [originalZpl])
})

test('HTML reflects the same independent side positions and right-side styles', async () => {
  const html = await buildLayoutHTML(originalData, { leftX: 1, leftY: -1, rightX: 1, rightY: 1, textWidth: 20, nameLines: 2, bold: false })
  assert.match(html, /class="qr" style="left:9\.509/)
  assert.match(html, /class="label-text" style="left:25\.024/)
  assert.match(html, /font-weight:400;white-space:normal/)
  assert.match(html, /max-height:/)
  assert.match(html, /size:100mm 20mm/)
})

test('HTML preview/browser renderer shares geometry, flags and escapes all free text', async () => {
  const html = await buildLayoutHTML({ ...SAMPLE_LABEL_DATA, item_name_prefix: '', item_name_main: '<script>alert(1)</script>' }, {
    width: 60, height: 40, gap: 2, columns: 2, showExp: false, footer: '<img onerror=alert(1)>'
  })
  assert.match(html, /size:122mm 40mm/)
  assert.match(html, /&lt;script&gt;/)
  assert.match(html, /&lt;img onerror=/)
  assert.doesNotMatch(html, /<script|<img|EXP :/)
  assert.match(html, /<svg/)
  assert.match(html, /MFG :/)
})

test('test print uses selected printer and synthetic identity without fetching/issuing serials', async () => {
  const saved = { cert: qz.security.setCertificatePromise, sign: qz.security.setSignaturePromise,
    algo: qz.security.setSignatureAlgorithm, active: qz.websocket.isActive,
    config: qz.configs.create, print: qz.print, fetch: globalThis.fetch }
  let printed
  try {
    qz.security.setCertificatePromise = () => {}
    qz.security.setSignaturePromise = () => {}
    qz.security.setSignatureAlgorithm = () => {}
    qz.websocket.isActive = () => true
    qz.configs.create = (printer, options) => { assert.equal(printer, 'LABEL'); return options }
    qz.print = async (config, jobs) => { printed = jobs }
    globalThis.fetch = () => { throw new Error('Test print must not call issuance endpoint') }
    assert.equal(await printTestLabel({ printer: 'LABEL' }), 'LABEL')
    assert.equal(printed.length, 1)
    assert.match(printed[0], /TEST-NOT-A-PRODUCTION-SERIAL/)
  } finally {
    qz.security.setCertificatePromise = saved.cert
    qz.security.setSignaturePromise = saved.sign
    qz.security.setSignatureAlgorithm = saved.algo
    qz.websocket.isActive = saved.active
    qz.configs.create = saved.config
    qz.print = saved.print
    globalThis.fetch = saved.fetch
  }
})

test('printer discovery and TEST signing use WO-independent authenticated endpoints', async () => {
  const saved = { cert: qz.security.setCertificatePromise, sign: qz.security.setSignaturePromise,
    algo: qz.security.setSignatureAlgorithm, active: qz.websocket.isActive,
    find: qz.printers.find, default: qz.printers.getDefault, fetch: globalThis.fetch, window: globalThis.window }
  let certificate, signature
  const calls = []
  try {
    qz.security.setCertificatePromise = fn => { certificate = fn }
    qz.security.setSignaturePromise = fn => { signature = fn }
    qz.security.setSignatureAlgorithm = () => {}
    qz.websocket.isActive = () => true
    qz.printers.find = async () => ['LABEL']
    qz.printers.getDefault = async () => 'LABEL'
    globalThis.window = { csrf_token: 'test-token' }
    globalThis.fetch = async (url, options) => {
      calls.push({ url, options })
      return { ok: true, json: async () => ({ message: url.endsWith('layout_certificate') ? 'CERT' : 'SIGNED' }) }
    }
    assert.deepEqual(await findLabelPrinters(), ['LABEL'])
    assert.deepEqual(await inspectLabelPrinters(), { printers: ['LABEL'], defaultPrinter: 'LABEL' })
    assert.equal(await certificate(), 'CERT')
    assert.equal(await signature('a'.repeat(64)), 'SIGNED')
    assert.equal(calls[0].url, '/api/method/product_qr.wo_labels.qz_signing.layout_certificate')
    assert.equal(calls[1].url, '/api/method/product_qr.wo_labels.qz_signing.layout_sign')
    assert.deepEqual(JSON.parse(calls[1].options.body), { request: 'a'.repeat(64) })
    assert.equal(calls[1].options.headers['X-Frappe-CSRF-Token'], 'test-token')
    assert.ok(calls.every(call => !call.url.includes('work_order') && !call.url.includes('get_label_data')))
    qz.printers.getDefault = async () => { throw new Error('No default printer') }
    assert.deepEqual(await inspectLabelPrinters(), { printers: ['LABEL'], defaultPrinter: '' })
    qz.printers.find = async () => { throw new Error('Discovery failed') }
    await assert.rejects(inspectLabelPrinters(), /Discovery failed/)
  } finally {
    qz.security.setCertificatePromise = saved.cert
    qz.security.setSignaturePromise = saved.sign
    qz.security.setSignatureAlgorithm = saved.algo
    qz.websocket.isActive = saved.active
    qz.printers.find = saved.find
    qz.printers.getDefault = saved.default
    globalThis.fetch = saved.fetch
    globalThis.window = saved.window
  }
})

test('printer destination displays detected/default names without claiming hardware connectivity', () => {
  const data = { printers: ['ZDesigner ZD230', 'Office Printer'], defaultPrinter: 'ZDesigner ZD230', loaded: true }
  assert.deepEqual(describeLabelPrinter(data), {
    name: 'ZDesigner ZD230', detail: 'Terdeteksi oleh QZ Tray. Status fisik online/offline belum diperiksa.'
  })
  assert.equal(describeLabelPrinter({ ...data, selected: 'Office Printer' }).name, 'Office Printer')
  assert.match(describeLabelPrinter({ ...data, selected: 'Old Printer' }).detail, /Belum terdeteksi/)
  assert.match(describeLabelPrinter({ selected: 'Saved Printer' }).detail, /belum diverifikasi/)
  assert.equal(describeLabelPrinter().name, 'Belum diketahui')
  assert.match(describeLabelPrinter({ loaded: true }).detail, /default sistem belum tersedia/)
  assert.equal(describeLabelPrinter({ lastPrinted: 'Previous custom printer' }).name, 'Belum diketahui')
  assert.match(describeLabelPrinter({ defaultPrinter: 'Zebra', lastPrinted: 'Zebra' }).detail, /TEST terakhir/)
})

test('production print consumes saved layout without changing WO/extra request', async () => {
  const saved = { cert: qz.security.setCertificatePromise, sign: qz.security.setSignaturePromise,
    algo: qz.security.setSignatureAlgorithm, active: qz.websocket.isActive,
    config: qz.configs.create, print: qz.print, fetch: globalThis.fetch,
    storage: globalThis.localStorage, window: globalThis.window }
  const s = storage()
  let printed
  try {
    saveLayout({ printer: 'LABEL', columns: 1, height: 40 }, s)
    globalThis.localStorage = s
    globalThis.window = { csrf_token: 'token' }
    qz.security.setCertificatePromise = () => {}
    qz.security.setSignaturePromise = () => {}
    qz.security.setSignatureAlgorithm = () => {}
    qz.websocket.isActive = () => true
    qz.configs.create = printer => { assert.equal(printer, 'LABEL'); return {} }
    qz.print = async (config, jobs) => { printed = jobs }
    globalThis.fetch = async (url, options) => {
      assert.match(url, /labels.get_label_data$/)
      assert.deepEqual(JSON.parse(options.body), { name: 'WO-1', extra: 2 })
      return { ok: true, json: async () => ({ message: SAMPLE_LABEL_DATA }) }
    }
    await printLabels('WO-1', 2)
    assert.match(printed[0], /\^LL320/)
    assert.match(printed[0], /TEST-NOT-A-PRODUCTION-SERIAL/)
    saveLayout({ ...LAYOUT_DEFAULTS, printer: 'LABEL' }, s)
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ message: originalData }) })
    await printLabels('WO-1', 2)
    assert.deepEqual(printed, [originalZpl], 'Saving defaults must not switch production to another layout')
  } finally {
    qz.security.setCertificatePromise = saved.cert
    qz.security.setSignaturePromise = saved.sign
    qz.security.setSignatureAlgorithm = saved.algo
    qz.websocket.isActive = saved.active
    qz.configs.create = saved.config
    qz.print = saved.print
    globalThis.fetch = saved.fetch
    globalThis.localStorage = saved.storage
    globalThis.window = saved.window
  }
})
