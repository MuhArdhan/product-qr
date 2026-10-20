import { buildLayoutHTML } from './label-layout.js'

let activeFrame

// A same-origin frame avoids popup blockers after the async issuance/QZ request.
// Keep it alive until afterprint (or the next invocation) for browser previews.
export const browserLabelPrinter = {
  async print(data, layout) {
    const html = await buildLayoutHTML(data, layout)
    activeFrame?.remove()
    const frame = document.createElement('iframe')
    activeFrame = frame
    frame.title = 'Cetak label Work Order'
    frame.setAttribute('aria-hidden', 'true')
    frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:1px;height:1px;border:0'
    try {
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Halaman cetak browser tidak selesai dimuat.')), 15000)
        frame.onload = () => { clearTimeout(timer); resolve() }
        frame.onerror = () => { clearTimeout(timer); reject(new Error('Gagal memuat halaman cetak browser.')) }
        frame.srcdoc = html
        document.body.appendChild(frame)
      })
      frame.contentWindow.addEventListener('afterprint', () => frame.remove(), { once: true })
      frame.contentWindow.focus()
      frame.contentWindow.print()
    } catch (error) {
      frame.remove()
      throw error
    }
  }
}
