/* Built-host smoke: API fixtures + offline QZ only, never prints physical labels. */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')
const { chromium } = require('playwright')

async function main() {
  const apps = path.resolve(__dirname, '../../../..')
  const htmlPath = path.join(apps, 'production_app/production_app/public/workspace/index.html')
  const base = process.env.WO_LABEL_BASE_URL || 'http://localhost:8000'
  const temp = process.env.OPENCODE_TEMP_DIR || (process.platform === 'win32'
    ? path.join(process.env.LOCALAPPDATA, 'Temp/opencode') : os.tmpdir())
  const profile = fs.mkdtempSync(path.join(temp, 'wo-label-browser-'))
  const executablePath = process.env.WO_LABEL_BROWSER || (process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' : undefined)
  const context = await chromium.launchPersistentContext(profile, {
    headless: true, executablePath, viewport: { width: 1440, height: 1000 }, serviceWorkers: 'block'
  })
  let checks = 0
  const page = await context.newPage()
  const errors = []
  const unknown = []
  const apiCalls = []
  const resources = []
  let downloads = 0
  try {
    page.on('download', () => downloads++)
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => { if (response.status() >= 400) resources.push({ path: new URL(response.url()).pathname, status: response.status() }) })
    await page.addInitScript(hang => {
      window.browserPrintJobs = []
      window.print = () => {
        const target = window.parent === window ? window : window.parent
        target.browserPrintJobs.push({ html: document.documentElement.outerHTML,
          labels: document.querySelectorAll('article').length, qr: document.querySelectorAll('svg').length })
        window.dispatchEvent(new Event('afterprint'))
      }
      window.qzConnectionAttempts = 0
      if (hang) {
        window.WebSocket = class {
          static CONNECTING = 0; static OPEN = 1; static CLOSING = 2; static CLOSED = 3
          constructor() { window.qzConnectionAttempts++; this.readyState = 0; this.listeners = {} }
          addEventListener(event, callback) { (this.listeners[event] ||= []).push(callback) }
          removeEventListener(event, callback) { this.listeners[event] = (this.listeners[event] || []).filter(fn => fn !== callback) }
          close() { this.readyState = 3; for (const callback of this.listeners.close || []) callback({}) }
        }
        return
      }
      window.WebSocket = class { constructor() { window.qzConnectionAttempts++; throw new Error('QZ offline: browser smoke fixture') } }
    }, process.env.WO_LABEL_QZ_HANG === '1')
    const wo = {
      name: 'WO-QR-BROWSER-TEST', production_item: 'SKU-TEST', production_item_name: 'Dough Browser Test',
      status: 'In Process', stage: 'post_packing', qty: 18, produced_qty: 0,
      planned_start_date: '2026-10-19', stock_uom: 'Pcs', stock_uom_whole_number: true,
      display_uom: 'Pack', display_conversion_factor: 6, custom_uom: 'Pack', custom_conversion_factor: 6,
      custom_prepacking_confirmed: 1, custom_good_qty_prepacking: 18,
      custom_postpacking_confirmed: 0, custom_good_qty_postpacking: 0,
      skip_prepacking: false, operations: [], job_cards: [], required_items: [], suggestion_sources: {}
    }
    await page.route('**/production_workspace', route => route.fulfill({
      contentType: 'text/html', body: fs.readFileSync(htmlPath, 'utf8').replace('<head>', '<head><script>window.csrf_token="browser-fixture";window.workspace_user="Label Test";</script>')
    }))
    // Read the current build directly: browser/server asset caches must not
    // accidentally exercise an older bundle while testing a source cutover.
    await page.route('**/assets/production_app/workspace/assets/*', route => {
      const name = path.basename(new URL(route.request().url()).pathname)
      const file = path.join(path.dirname(htmlPath), 'assets', name)
      return route.fulfill({ contentType: name.endsWith('.css') ? 'text/css' : 'text/javascript', body: fs.readFileSync(file) })
    })
    await page.route('**/api/method/**', async route => {
      const method = new URL(route.request().url()).pathname.split('/api/method/')[1]
      apiCalls.push(method)
      let message
      if (method.endsWith('.wo_detail')) message = wo
      else if (method.endsWith('.wo_list')) message = { rows: [wo], total: 1, start: 0, page_len: 20 }
      else if (method.endsWith('.company_preference')) message = { company: '', companies: [] }
      else if (method.endsWith('.list_preferences')) message = {}
      else if (method.endsWith('.ui_preferences')) message = { font_scale: 100 }
      else if (method.endsWith('.suggestion_preferences')) message = { enabled: false }
      else if (method.endsWith('.warehouse_defaults')) message = {}
      else if (method.endsWith('.skip_prepacking_items')) message = []
      else if (method.endsWith('.handover_board')) message = { roles: { is_produksi: true, can_settings: true }, lots: [], requests: [] }
      else if (method.endsWith('.get_existing_label_numbers')) message = {
        work_order: wo.name, adonan_ke: 7,
        labels: [1, 2, 3].map(label_number => ({ label_number, adonan_ke: 7 }))
      }
      else if (method.endsWith('.get_label_data')) {
        const request = route.request().postDataJSON()
        const numbers = request.label_numbers || (request.append_count ? [4, 5].slice(0, request.append_count) : [1, 2, 3])
        message = { sku: 'SKU-TEST', item_name: 'Dough Browser Test', label_count: numbers.length,
          labels: numbers.map(label_number => ({ label_number, qr_value: `SKU-TEST-BATCH-S${label_number}`, serial_no: `S${label_number}` })) }
      }
      else { unknown.push(method); return route.fulfill({ status: 500, json: { message: 'Unexpected smoke API request' } }) }
      return route.fulfill({ json: { message } })
    })
    await page.goto(`${base}/production_workspace#/settings`, { waitUntil: 'networkidle' })
    const settings = page.locator('.pqr-layout')
    const printerStatus = settings.locator('[data-label-printer-destination]')
    const timeoutInput = settings.getByLabel('Timeout koneksi QZ (detik)', { exact: true })
    assert.equal(await timeoutInput.inputValue(), '8'); checks++
    assert.equal(await timeoutInput.getAttribute('min'), '1')
    assert.equal(await timeoutInput.getAttribute('max'), '60'); checks++
    assert.match(await printerStatus.innerText(), /Belum diketahui/); checks++
    assert.equal(await settings.getByLabel('Tinggi label (mm)', { exact: true }).inputValue(), '20')
    assert.equal(await settings.getByLabel('Ukuran teks (pt)', { exact: true }).inputValue(), '7.45')
    assert.equal(await settings.getByLabel('Ukuran nama produk (pt)', { exact: true }).inputValue(), '9.22'); checks++
    const panelStyles = await page.evaluate(() => {
      const sample = selector => {
        const s = getComputedStyle(document.querySelector(selector))
        return [s.backgroundColor, s.borderRadius, s.borderTopColor]
      }
      return { host: sample('.settings-panel:not(.pqr-layout)'), label: sample('.pqr-layout') }
    })
    assert.deepEqual(panelStyles.label, panelStyles.host); checks++
    assert.equal(await settings.locator('.settings-block').count(), 4); checks++
    assert.equal(await settings.getByRole('switch').count(), 0); checks++
    assert.equal(await settings.locator('iframe,input[type="checkbox"]').count(), 0); checks++
    if (process.env.WO_LABEL_SCREENSHOTS) {
      const directory = fs.mkdtempSync(path.join(temp, 'wo-label-style-'))
      await settings.screenshot({ path: path.join(directory, 'desktop.png') })
      await page.setViewportSize({ width: 390, height: 844 })
      await settings.screenshot({ path: path.join(directory, 'mobile.png') })
      console.log('Style screenshots:', directory)
      await page.setViewportSize({ width: 1440, height: 1000 })
    }
    // Removing the UI must not silently discard pre-existing saved choices.
    await page.evaluate(() => localStorage.setItem('product_qr:wo_label_layout:v1', JSON.stringify({ printer: 'Zebra Saved', bold: false, showSku: false })))
    await page.reload({ waitUntil: 'networkidle' })
    assert.match(await printerStatus.innerText(), /Zebra Saved/)
    assert.match(await printerStatus.innerText(), /belum diverifikasi/); checks++
    assert.equal(await timeoutInput.inputValue(), '8'); checks++
    await timeoutInput.fill('3')
    const discoveryStarted = Date.now()
    await settings.getByRole('button', { name: 'Hubungkan / muat printer', exact: true }).click()
    await settings.getByRole('status').filter({ hasText: /QZ offline|tidak merespons|Unable to establish|connection|connect|WebSocket/i }).waitFor({ timeout: 30000 })
    if (process.env.WO_LABEL_QZ_HANG === '1') {
      assert.match(await settings.getByRole('status').innerText(), /dalam 3 detik/)
      assert.ok(Date.now() - discoveryStarted >= 2900 && Date.now() - discoveryStarted < 10000); checks++
    }
    assert.equal(await settings.getByLabel('Printer label', { exact: true }).inputValue(), 'Zebra Saved')
    assert.doesNotMatch(await printerStatus.innerText(), /Terdeteksi oleh QZ Tray/); checks++
    await settings.getByLabel('Lebar label (mm)', { exact: true }).fill('60')
    await settings.getByLabel('Jumlah kolom', { exact: true }).fill('1')
    await settings.getByRole('heading', { name: 'Konten kiri — QR', exact: true }).waitFor()
    await settings.getByRole('heading', { name: 'Konten kanan — Teks', exact: true }).waitFor(); checks++
    await settings.getByLabel('Geser QR horizontal (mm)', { exact: true }).fill('1')
    await settings.getByLabel('Geser teks horizontal (mm)', { exact: true }).fill('1')
    await settings.getByLabel('Geser teks vertikal (mm)', { exact: true }).fill('1')
    await settings.getByLabel('Lebar area teks (mm; 0 = otomatis)', { exact: true }).fill('20')
    await settings.getByLabel('Maksimal baris nama produk', { exact: true }).fill('2')
    await settings.getByLabel('Footer', { exact: true }).fill('<script>TEST</script>')
    await settings.getByRole('button', { name: 'Simpan layout label', exact: true }).click()
    await page.getByText('Pengaturan label disimpan di perangkat ini.', { exact: true }).waitFor()
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('product_qr:wo_label_layout:v1')))
    assert.equal(stored.width, 60)
    assert.equal(stored.columns, 1); checks++
    assert.equal(stored.qzTimeout, 3); checks++
    assert.equal(stored.leftX, 1)
    assert.equal(stored.rightX, 1)
    assert.equal(stored.rightY, 1)
    assert.equal(stored.nameLines, 2)
    assert.equal(stored.bold, false)
    assert.equal(stored.showSku, false); checks++
    assert.equal(await settings.getByLabel('Work Order untuk uji printer', { exact: true }).count(), 0); checks++
    await settings.getByRole('button', { name: 'Cetak label TEST', exact: true }).click()
    await settings.getByRole('status').filter({ hasText: /QZ offline|tidak merespons|Unable to establish|connection|connect|WebSocket/i }).waitFor({ timeout: 30000 })
    assert.equal(apiCalls.some(method => method.endsWith('.get_label_data')), false); checks++
    assert.equal(apiCalls.some(method => method.endsWith('.wo_detail')), false); checks++
    await page.goto(`${base}/production_workspace#/wo/${wo.name}`, { waitUntil: 'networkidle' })
    const print = page.getByRole('button', { name: 'Cetak Label', exact: true })
    await print.waitFor({ state: 'visible' }); checks++
    await print.click()
    const dialog = page.locator('dialog[open]').filter({ has: page.locator('#label-print-title') })
    await dialog.waitFor({ state: 'visible' }); checks++
    assert.match(await dialog.innerText(), /Usulan otomatis dari Good Qty dan UOM: 3 label/); checks++
    const countMode = dialog.locator('#label-count-mode')
    await countMode.evaluate(el => el.blur())
    const countModeTheme = await countMode.evaluate(el => {
      const style = getComputedStyle(el)
      return { appearance: style.appearance, height: style.height, radius: style.borderRadius,
        border: style.borderColor, color: style.color, arrow: style.backgroundImage, paddingRight: style.paddingRight }
    })
    assert.deepEqual(countModeTheme, { appearance: 'none', height: '34px', radius: '8px',
      border: 'rgb(212, 221, 228)', color: 'rgb(36, 48, 58)',
      arrow: countModeTheme.arrow, paddingRight: '36px' })
    assert.notEqual(countModeTheme.arrow, 'none'); checks++
    await countMode.focus()
    assert.equal(await countMode.evaluate(el => getComputedStyle(el).borderColor), 'rgb(51, 104, 160)'); checks++
    assert.equal(await page.locator('.pqr-layout').count(), 0); checks++
    await countMode.selectOption('append')
    assert.equal(await dialog.locator('#extra-label-count').count(), 0); checks++
    await dialog.locator('#append-label-count').fill('2')
    assert.match(await dialog.innerText(), /Nomor baru: #4–#5/); checks++
    assert.match(await dialog.innerText(), /Label lanjutan: 2 label/); checks++
    await countMode.selectOption('automatic')
    assert.equal(await dialog.locator('#append-label-count').count(), 0); checks++
    assert.equal(await dialog.locator('#extra-label-count').count(), 1); checks++
    await dialog.locator('#extra-label-count').fill('2')
    assert.match(await dialog.innerText(), /Total cetak otomatis: 5 label/); checks++
    await dialog.locator('#extra-label-count').fill('-1')
    assert.equal(await dialog.getByRole('button', { name: 'Ya, Cetak Label', exact: true }).isDisabled(), true); checks++
    await dialog.locator('#extra-label-count').fill('0')
    await countMode.selectOption('specific')
    assert.equal(await dialog.locator('#extra-label-count').count(), 0); checks++
    assert.equal(await dialog.getByRole('button', { name: 'Cetak via Browser', exact: true }).count(), 0); checks++
    const reprintNumber = dialog.locator('#label-number-select')
    await reprintNumber.waitFor({ state: 'visible' })
    await countMode.evaluate(el => el.blur())
    const reprintTheme = await reprintNumber.evaluate(el => {
      const style = getComputedStyle(el)
      return { appearance: style.appearance, height: style.height, radius: style.borderRadius,
        border: style.borderColor, color: style.color, arrow: style.backgroundImage, paddingRight: style.paddingRight }
    })
    assert.equal(reprintTheme.appearance, countModeTheme.appearance)
    assert.equal(reprintTheme.height, countModeTheme.height)
    assert.equal(reprintTheme.radius, countModeTheme.radius)
    assert.equal(reprintTheme.border, countModeTheme.border)
    assert.equal(reprintTheme.color, countModeTheme.color)
    assert.equal(reprintTheme.arrow, countModeTheme.arrow)
    assert.equal(reprintTheme.paddingRight, countModeTheme.paddingRight); checks++
    await reprintNumber.focus()
    assert.equal(await reprintNumber.evaluate(el => getComputedStyle(el).borderColor), 'rgb(51, 104, 160)'); checks++
    assert.equal(await reprintNumber.locator('option').count(), 4); checks++
    await reprintNumber.selectOption('2')
    assert.match(await dialog.innerText(), /Label #2/)
    assert.match(await dialog.innerText(), /Adonan ke 7/)
    assert.match(await dialog.innerText(), /Dipilih: Label #2/); checks++
    assert.equal(await dialog.locator('input[type="checkbox"], input[type="search"]').count(), 0); checks++
    assert.match(await dialog.innerText(), /Total cetak ulang: 1 label/); checks++
    await dialog.getByRole('button', { name: 'Nanti saja', exact: true }).click()
    assert.equal(await page.locator('#label-print-title').evaluate(el => el.closest('dialog').open), false); checks++
    await page.setViewportSize({ width: 390, height: 844 })
    await print.click()
    await dialog.waitFor({ state: 'visible' })
    assert.match(await dialog.innerText(), /Total cetak otomatis: 3 label/); checks++
    const box = await dialog.boundingBox()
    assert.ok(box.x >= 0 && box.x + box.width <= 391); checks++
    assert.ok(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth + 1)); checks++
    const beforeIssue = apiCalls.filter(method => method.endsWith('.get_label_data')).length
    const jobsBefore = await page.evaluate(() => window.browserPrintJobs.length)
    const fallbackStarted = Date.now()
    await dialog.getByRole('button', { name: 'Ya, Cetak Label', exact: true }).click()
    await page.getByRole('status').filter({ hasText: /Dialog cetak browser dibuka/ }).waitFor()
    if (process.env.WO_LABEL_QZ_HANG === '1') {
      assert.ok(await page.evaluate(() => window.qzConnectionAttempts > 0))
      assert.ok(Date.now() - fallbackStarted >= 2900)
      assert.ok(Date.now() - fallbackStarted < 20000); checks++
    }
    const printJobs = await page.evaluate(() => window.browserPrintJobs)
    assert.equal(printJobs.length, jobsBefore + 1); checks++
    assert.equal(printJobs.at(-1).labels, 3)
    assert.equal(printJobs.at(-1).qr, 3); checks++
    assert.match(printJobs.at(-1).html, /size:60mm 20mm/); checks++
    assert.equal(apiCalls.filter(method => method.endsWith('.get_label_data')).length, beforeIssue + 1); checks++
    assert.equal(await page.locator('#label-print-title').evaluate(el => el.closest('dialog').open), false); checks++
    for (const mode of ['append', 'specific']) {
      await print.click()
      await dialog.waitFor({ state: 'visible' })
      await dialog.locator('#label-count-mode option[value="append"]:not([disabled])').waitFor({ state: 'attached' })
      await countMode.selectOption(mode)
      if (mode === 'append') await dialog.locator('#append-label-count').fill('2')
      else if (mode === 'specific') await dialog.locator('#label-number-select').selectOption('2')
      const before = apiCalls.filter(method => method.endsWith('.get_label_data')).length
      const requestPromise = page.waitForRequest(req => req.url().endsWith('.get_label_data'))
      const beforePrint = await page.evaluate(() => window.browserPrintJobs.length)
      await dialog.getByRole('button', { name: 'Ya, Cetak Label', exact: true }).click()
      const request = (await requestPromise).postDataJSON()
      assert.deepEqual(request, mode === 'append' ? { name: wo.name, extra: 0, append_count: 2 }
        : mode === 'specific' ? { name: wo.name, extra: 0, label_numbers: [2] }
          : { name: wo.name, extra: 0 }); checks++
      await page.getByRole('status').filter({ hasText: /Dialog cetak browser dibuka/ }).waitFor()
      const jobs = await page.evaluate(() => window.browserPrintJobs)
      assert.equal(jobs.length, beforePrint + 1)
      assert.equal(jobs.at(-1).labels, mode === 'append' ? 2 : mode === 'specific' ? 1 : 3); checks++
      if (mode === 'specific') assert.match(jobs.at(-1).html, />2<\/div>/)
      assert.equal(apiCalls.filter(method => method.endsWith('.get_label_data')).length, before + 1); checks++
    }
    assert.equal(downloads, 0); checks++
    Object.assign(wo, { skip_prepacking: true, stage: 'finish', custom_prepacking_confirmed: 0,
      custom_good_qty_prepacking: 0, custom_postpacking_confirmed: 1, custom_good_qty_postpacking: 12 })
    await page.reload({ waitUntil: 'networkidle' })
    await print.waitFor({ state: 'visible' }); checks++
    await print.click()
    await dialog.waitFor({ state: 'visible' })
    assert.match(await dialog.innerText(), /Usulan otomatis dari Good Qty dan UOM: 2 label/); checks++
    await dialog.getByRole('button', { name: 'Nanti saja', exact: true }).click()
    Object.assign(wo, { stage: 'post_packing', custom_postpacking_confirmed: 0 })
    await page.reload({ waitUntil: 'networkidle' })
    await page.getByRole('heading', { name: 'Post-Packing', exact: true }).waitFor({ state: 'visible' })
    assert.equal(await print.count(), 0); checks++
    await page.goto(`${base}/production_workspace#/settings`, { waitUntil: 'networkidle' })
    assert.ok(await settings.evaluate(el => el.scrollWidth <= el.clientWidth + 1)); checks++
    assert.equal(await settings.locator('.settings-block').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length), 1); checks++
    assert.equal(await settings.getByLabel('Lebar label (mm)', { exact: true }).inputValue(), '60'); checks++
    assert.equal(await timeoutInput.inputValue(), '3'); checks++
    assert.equal(await settings.getByLabel('Geser QR horizontal (mm)', { exact: true }).inputValue(), '1')
    assert.equal(await settings.getByLabel('Geser teks horizontal (mm)', { exact: true }).inputValue(), '1')
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('product_qr:wo_label_layout:v1')).bold), false); checks++
    await settings.getByRole('button', { name: 'Pulihkan default ZPL', exact: true }).click()
    await page.getByText('Kembali menggunakan default ZPL asli.', { exact: true }).waitFor()
    assert.equal(await page.evaluate(() => localStorage.getItem('product_qr:wo_label_layout:v1')), null); checks++
    assert.equal(await timeoutInput.inputValue(), '8'); checks++
    assert.match(await printerStatus.innerText(), /Belum diketahui/); checks++
    assert.equal(await settings.getByLabel('Tinggi label (mm)', { exact: true }).inputValue(), '20'); checks++
    assert.equal(await settings.getByLabel('Geser QR horizontal (mm)', { exact: true }).inputValue(), '0')
    assert.equal(await settings.getByLabel('Geser teks horizontal (mm)', { exact: true }).inputValue(), '0')
    assert.equal(await settings.locator('iframe,input[type="checkbox"]').count(), 0); checks++
    // Exercise the standalone browser-print entry with read-only issued-label
    // fixtures, not a live operator session or an issuance endpoint.
    await page.route('**/assets/product_qr/wo_labels/*', route => {
      const name = path.basename(new URL(route.request().url()).pathname)
      return route.fulfill({ contentType: 'text/javascript', body: fs.readFileSync(path.join(apps, 'product_qr/product_qr/public/wo_labels', name)) })
    })
    const printData = { sku: 'SKU-TEST', item_name: 'Browser Print TEST', manufacturing_date: '2026-10-20',
      expiry_date: '2026-11-20', labels: [1, 2, 3].map(n => ({ qr_value: `TEST-NOT-PRODUCTION-${n}` })) }
    await page.route('**/product_qr_work_order_label?*', route => route.fulfill({ contentType: 'text/html', body:
      `<!doctype html><html><head><style></style></head><body><div class="print-controls">Cetak</div><div id="pqr-labels"><div class="batch-label">Legacy fixture</div></div><script type="application/json" id="pqr-layout-data">${JSON.stringify(printData)}</script><script type="module" src="/assets/product_qr/wo_labels/layout-browser.js"></script></body></html>`
    }))
    await page.goto(`${base}/product_qr_work_order_label?name=WO-TEST&embedded=1`, { waitUntil: 'networkidle' })
    await page.waitForFunction(() => window.workOrderLabelReady === true)
    assert.equal(await page.locator('#pqr-labels article').count(), 3)
    assert.match(await page.locator('style').textContent(), /size:100mm 20mm/); checks++
    await page.evaluate(() => localStorage.setItem('product_qr:wo_label_layout:v1', JSON.stringify({ width: 60, height: 40, columns: 2, gap: 2 })))
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForFunction(() => window.workOrderLabelReady === true)
    assert.equal(await page.locator('#pqr-labels section').count(), 2)
    assert.equal(await page.locator('#pqr-labels article').count(), 3)
    assert.equal(await page.locator('#pqr-labels svg').count(), 3); checks++
    assert.match(await page.locator('style').textContent(), /size:122mm 40mm/); checks++
    assert.equal(await page.locator('#pqr-labels .batch-label').count(), 0); checks++
    await page.evaluate(() => localStorage.removeItem('product_qr:wo_label_layout:v1'))
    assert.equal(unknown.length, 0, unknown.join(', '))
    assert.equal(errors.length, 0, errors.join('\n'))
    assert.ok(apiCalls.some(method => method.endsWith('.wo_detail'))); checks++
    console.log(JSON.stringify({ checks, result: 'PASS', scope: 'Built Production App + Product QR UI; mock API, forced QZ offline; no physical print' }))
  } catch (error) {
    console.error(JSON.stringify({ checks, errors, unknown, apiCalls, resources, page: await page.locator('body').innerText().catch(() => 'Unavailable') }))
    throw error
  } finally {
    await context.close()
    fs.rmSync(profile, { recursive: true, force: true })
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
