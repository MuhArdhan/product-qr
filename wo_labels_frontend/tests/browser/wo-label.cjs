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
  try {
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => { if (response.status() >= 400) resources.push({ path: new URL(response.url()).pathname, status: response.status() }) })
    await page.addInitScript(() => {
      window.WebSocket = class { constructor() { throw new Error('QZ offline: browser smoke fixture') } }
    })
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
      else if (method.endsWith('.handover_board')) message = { roles: { is_produksi: true, can_settings: true }, lots: [], requests: [] }
      else { unknown.push(method); return route.fulfill({ status: 500, json: { message: 'Unexpected smoke API request' } }) }
      return route.fulfill({ json: { message } })
    })
    await page.goto(`${base}/production_workspace#/wo/${wo.name}`, { waitUntil: 'networkidle' })
    const print = page.getByRole('button', { name: 'Cetak Label', exact: true })
    await print.waitFor({ state: 'visible' }); checks++
    await print.click()
    const dialog = page.locator('dialog[open]').filter({ has: page.locator('#label-print-title') })
    await dialog.waitFor({ state: 'visible' }); checks++
    assert.match(await dialog.innerText(), /Label sesuai Good Qty: 3/); checks++
    await dialog.locator('#extra-label-count').fill('2')
    assert.match(await dialog.innerText(), /Total cetak: 5 label/); checks++
    await dialog.locator('#extra-label-count').fill('-1')
    assert.equal(await dialog.getByRole('button', { name: 'Ya, Cetak Label', exact: true }).isDisabled(), true); checks++
    await dialog.getByRole('button', { name: 'Nanti saja', exact: true }).click()
    assert.equal(await page.locator('#label-print-title').evaluate(el => el.closest('dialog').open), false); checks++
    await page.setViewportSize({ width: 390, height: 844 })
    await print.click()
    await dialog.waitFor({ state: 'visible' })
    assert.match(await dialog.innerText(), /Total cetak: 3 label/); checks++
    const box = await dialog.boundingBox()
    assert.ok(box.x >= 0 && box.x + box.width <= 391); checks++
    await dialog.getByRole('button', { name: 'Ya, Cetak Label', exact: true }).click()
    await page.locator('#wo-label-error-title').waitFor({ state: 'visible', timeout: 30000 }); checks++
    assert.equal(await page.locator('#error-dialog-title').count(), 1)
    assert.equal(await page.locator('#wo-label-error-title').count(), 1); checks++
    await page.locator('#wo-label-error-title').evaluate(el => el.closest('dialog').querySelector('button').click())
    assert.equal(await page.locator('#wo-label-error-title').evaluate(el => el.closest('dialog').open), false); checks++
    await dialog.getByRole('button', { name: 'Nanti saja', exact: true }).click()
    Object.assign(wo, { skip_prepacking: true, stage: 'finish', custom_prepacking_confirmed: 0,
      custom_good_qty_prepacking: 0, custom_postpacking_confirmed: 1, custom_good_qty_postpacking: 12 })
    await page.reload({ waitUntil: 'networkidle' })
    await print.waitFor({ state: 'visible' }); checks++
    await print.click()
    await dialog.waitFor({ state: 'visible' })
    assert.match(await dialog.innerText(), /Label sesuai Good Qty: 2/); checks++
    await dialog.getByRole('button', { name: 'Nanti saja', exact: true }).click()
    Object.assign(wo, { stage: 'post_packing', custom_postpacking_confirmed: 0 })
    await page.reload({ waitUntil: 'networkidle' })
    await page.getByRole('heading', { name: 'Post-Packing', exact: true }).waitFor({ state: 'visible' })
    assert.equal(await print.count(), 0); checks++
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
