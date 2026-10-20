import { loadLayout, buildLayoutHTML } from './label-layout.js'

async function ready() {
  const layout = loadLayout()
  // The same ZPL-derived geometry is the default with or without overrides.
  const data = JSON.parse(document.getElementById('pqr-layout-data').textContent)
  const html = await buildLayoutHTML(data, layout)
  const parsed = new DOMParser().parseFromString(html, 'text/html')
  document.querySelector('style').textContent = parsed.querySelector('style').textContent + '\n.print-controls{padding:12px;font:13px Arial}@media print{.print-controls{display:none}}'
  const labels = document.getElementById('pqr-labels')
  labels.replaceChildren(...parsed.body.childNodes)
  if (document.readyState !== 'complete') {
    await new Promise(resolve => window.addEventListener('load', resolve, { once: true }))
  }
  const button = document.getElementById('pqr-print-again')
  if (button) button.disabled = false
  window.workOrderLabelReady = true
  if (new URLSearchParams(window.location.search).get('embedded') !== '1') window.print()
}

ready().catch(error => {
  const warning = document.createElement('p')
  warning.textContent = `Layout label gagal dimuat: ${error.message}. Periksa pengaturan sebelum mencetak.`
  document.querySelector('.print-controls').append(warning)
})
