import QRCode from 'qrcode'

export const LAYOUT_KEY = 'product_qr:wo_label_layout:v1'
export const LAYOUT_DEFAULTS = Object.freeze({
  // Original ZPL: 400 dots/column, 160 dots high at 203 DPI; QR ^BQN,2,4.
  // Point sizes round back to the original 21-dot and 26-dot fonts.
  printer: '', width: 50, height: 20, columns: 2, gap: 0, dpi: 203,
  margin: 0, qrSize: 16, fontSize: 7.45, productFontSize: 9.22, lineHeight: 1,
  align: 'left', showSku: true, showMfg: true, showExp: true, showSequence: true, footer: '',
  leftX: 0, leftY: 0, rightX: 0, rightY: 0, textWidth: 0, prefixFontSize: 0,
  nameLines: 1, showPrefix: true, bold: true, qzTimeout: 8
})
export const LAYOUT_NUMBERS = [
  { key: 'qzTimeout', label: 'Timeout koneksi QZ (detik)', min: 1, max: 60, step: 1 },
  { key: 'width', label: 'Lebar label (mm)', min: 30, max: 120, step: 0.5 },
  { key: 'height', label: 'Tinggi label (mm)', min: 20, max: 150, step: 0.5 },
  { key: 'columns', label: 'Jumlah kolom', min: 1, max: 3, step: 1 },
  { key: 'gap', label: 'Jarak antarkolom (mm)', min: 0, max: 10, step: 0.5 },
  { key: 'dpi', label: 'Resolusi printer (DPI)', min: 203, max: 600, step: 1 },
  { key: 'margin', label: 'Margin tambahan (mm)', min: 0, max: 8, step: 0.5 },
  { key: 'qrSize', label: 'Ukuran QR acuan (mm)', min: 10, max: 30, step: 0.5 },
  { key: 'fontSize', label: 'Ukuran teks (pt)', min: 6, max: 18, step: 0.01 },
  { key: 'productFontSize', label: 'Ukuran nama produk (pt)', min: 8, max: 30, step: 0.01 },
  { key: 'lineHeight', label: 'Spasi baris', min: 1, max: 2, step: 0.1 },
  { key: 'leftX', label: 'Geser QR horizontal (mm)', min: -50, max: 50, step: 0.1 },
  { key: 'leftY', label: 'Geser QR vertikal (mm)', min: -50, max: 50, step: 0.1 },
  { key: 'rightX', label: 'Geser teks horizontal (mm)', min: -50, max: 50, step: 0.1 },
  { key: 'rightY', label: 'Geser teks vertikal (mm)', min: -50, max: 50, step: 0.1 },
  { key: 'textWidth', label: 'Lebar area teks (mm; 0 = otomatis)', min: 0, max: 120, step: 0.5 },
  { key: 'prefixFontSize', label: 'Ukuran prefix (pt; 0 = otomatis)', min: 0, max: 18, step: 0.01 },
  { key: 'nameLines', label: 'Maksimal baris nama produk', min: 1, max: 4, step: 1 }
]

export function normalizeLayout(raw = {}) {
  raw = raw && typeof raw === 'object' ? raw : {}
  const c = { ...LAYOUT_DEFAULTS }
  for (const f of LAYOUT_NUMBERS) {
    const n = Number(raw[f.key])
    if (raw[f.key] !== '' && raw[f.key] != null && Number.isFinite(n)) {
      c[f.key] = Math.min(f.max, Math.max(f.min, n))
    }
  }
  c.columns = Math.round(c.columns)
  c.nameLines = Math.round(c.nameLines)
  c.qzTimeout = Math.round(c.qzTimeout)
  c.dpi = [203, 300, 600].includes(Number(raw.dpi)) ? Number(raw.dpi) : 203
  c.align = ['left', 'center', 'right'].includes(raw.align) ? raw.align : 'left'
  for (const key of ['showSku', 'showMfg', 'showExp', 'showSequence', 'showPrefix', 'bold']) {
    if (raw[key] != null) c[key] = raw[key] === true || raw[key] === 1
  }
  c.printer = String(raw.printer || '').slice(0, 200)
  c.footer = String(raw.footer || '').slice(0, 100)
  return c
}

export function loadLayout(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(LAYOUT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? normalizeLayout(parsed) : null
  } catch { return null }
}

export function saveLayout(raw, storage = globalThis.localStorage) {
  const c = normalizeLayout(raw)
  if (!storage) throw new Error('Penyimpanan browser tidak tersedia.')
  storage.setItem(LAYOUT_KEY, JSON.stringify(c))
  return c
}

export function resetLayout(storage = globalThis.localStorage) {
  if (!storage) throw new Error('Penyimpanan browser tidak tersedia.')
  storage.removeItem(LAYOUT_KEY)
}

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const zpl = value => String(value ?? '').replace(/[_^~\\]/g, c => ({ _: '_5F', '^': '_5E', '~': '_7E', '\\': '_5C' })[c])
const date = value => value ? String(value).slice(0, 10).split('-').reverse().map((v, i) => i === 2 ? v.slice(-2) : v).join('-') : '-'
const dots = (mm, c) => Math.round(mm * c.dpi / 25.4)

export const SAMPLE_LABEL_DATA = Object.freeze({
  sku: 'SKU-TEST', item_name: 'Dough Ropi Butter', item_name_prefix: 'Dough', item_name_main: 'Ropi Butter', manufacturing_date: '2026-10-20',
  expiry_date: '2026-11-20', label_count: 1,
  labels: [{ label_number: 1, qr_value: 'TEST-NOT-A-PRODUCTION-SERIAL', serial_no: 'TEST' }]
})

function geometry(c) {
  const scale = c.dpi / 203
  const unit = n => Math.round(n * scale)
  const shift = dots(c.margin, c)
  const size = Math.round(c.fontSize * c.dpi / 72)
  const productSize = Math.round(c.productFontSize * c.dpi / 72)
  return {
    unit, shift, size, productSize,
    column: dots(c.width, c), gap: dots(c.gap, c), height: dots(c.height, c),
    qrX: Math.max(0, unit(68) + shift + dots(c.leftX, c)), qrY: Math.max(0, unit(32) + shift + dots(c.leftY, c)),
    qrScale: Math.min(10, Math.max(2, Math.round(4 * c.qrSize / LAYOUT_DEFAULTS.qrSize * scale))),
    textX: Math.max(0, unit(192) + shift + dots(c.rightX, c)),
    textY: Math.max(0, unit(32) + shift + dots(c.rightY, c)),
    sequenceX: Math.max(0, unit(355) + shift + dots(c.rightX, c)),
    sequenceY: Math.max(0, unit(28) + shift + dots(c.rightY, c)),
    fontRatio: size / 21, productRatio: productSize / 26
  }
}

function labelText(data, seq, c, g) {
  const parts = []
  const smallSize = Math.round(18 * g.fontRatio)
  if (c.showSequence) parts.push({ x: g.sequenceX, y: g.sequenceY, size: smallSize, text: String(seq), sequence: true, lines: 1 })
  let y = g.textY
  const add = (text, size, lines = 1) => parts.push({ x: g.textX, y, size, text, lines })
  if (data.item_name_prefix) {
    const prefixSize = c.prefixFontSize > 0 ? Math.round(c.prefixFontSize * c.dpi / 72) : smallSize
    if (c.showPrefix) add(data.item_name_prefix, prefixSize)
    y += Math.round(20 * prefixSize / 18 * c.lineHeight)
    add(data.item_name_main || '', g.productSize, c.nameLines)
    y += Math.round((28 * g.productRatio + g.productSize * (c.nameLines - 1)) * c.lineHeight)
  } else {
    add(data.item_name_main || data.item_name || '', g.productSize, c.nameLines)
    y += Math.round((30 * g.productRatio + g.productSize * (c.nameLines - 1)) * c.lineHeight)
  }
  // Hide a field without moving other original anchors.
  for (const [enabled, value] of [[c.showSku, `SKU : ${data.sku}`], [c.showMfg, `MFG : ${date(data.manufacturing_date)}`], [c.showExp, `EXP : ${date(data.expiry_date)}`]]) {
    if (enabled) add(value, g.size)
    y += Math.round(24 * g.fontRatio * c.lineHeight)
  }
  if (c.footer) add(c.footer, g.size)
  return parts
}

const field = value => {
  const text = String(value ?? '')
  const escaped = zpl(text)
  // Keep ordinary historical output byte-identical, but escape control syntax
  // (including '_' in QR identities) with ^FH when it is actually needed.
  return `${escaped === text ? '' : '^FH_'}^FD${escaped}^FS\n`
}

function textWidth(c, g) {
  const available = Math.max(1, g.column - g.textX - g.shift)
  return c.textWidth > 0 ? Math.max(1, Math.min(available, dots(c.textWidth, c))) : available
}

export function buildLayoutZpl(data, raw) {
  const c = normalizeLayout(raw)
  const g = geometry(c)
  const jobs = []
  const text = (part, offset) => {
    const useBlock = c.textWidth > 0 || part.lines > 1 || c.align !== 'left'
    const fb = part.sequence ? `^FB${g.unit(40)},1,0,R` : !useBlock ? '' : `^FB${textWidth(c, g)},${part.lines},0,${{ left: 'L', center: 'C', right: 'R' }[c.align]}`
    const draw = x => `^FO${x},${part.y}^A0N,${part.size},${part.size}${fb}${field(part.text)}`
    return draw(offset + part.x) + (c.bold ? draw(offset + part.x + g.unit(1)) : '')
  }
  for (let start = 0; start < data.labels.length; start += c.columns) {
    // Round the original 400-dot column first: 2 columns must be exactly 800,
    // not 799 (rounding 100mm in one conversion at 203 DPI).
    let job = `^XA\n^PW${g.column * c.columns + g.gap * (c.columns - 1)}\n^LL${g.height}\n`
    for (let col = 0; col < c.columns && start + col < data.labels.length; col++) {
      const label = data.labels[start + col]
      const offset = col * (g.column + g.gap)
      const parts = labelText(data, label.label_number ?? start + col + 1, c, g)
      if (parts[0]?.sequence) job += text(parts.shift(), offset)
      job += `^FO${offset + g.qrX},${g.qrY}^BQN,2,${g.qrScale}${field(`QA,${label.qr_value}`)}`
      for (const part of parts) job += text(part, offset)
    }
    jobs.push(job + '^XZ\n')
  }
  return jobs
}

export async function buildLayoutHTML(data, raw) {
  const c = normalizeLayout(raw)
  const g = geometry(c)
  const mm = n => n * 25.4 / c.dpi
  const rows = []
  for (let start = 0; start < data.labels.length; start += c.columns) {
    const labels = await Promise.all(data.labels.slice(start, start + c.columns).map(async (label, col) => {
      const qrOptions = { errorCorrectionLevel: 'Q', margin: 0 }
      const qr = await QRCode.toString(label.qr_value, { ...qrOptions, type: 'svg' })
      const qrWidth = QRCode.create(label.qr_value, qrOptions).modules.size * g.qrScale
      const text = labelText(data, label.label_number ?? start + col + 1, c, g).map(part => {
        const width = part.sequence ? g.unit(40) : textWidth(c, g)
        const wraps = part.lines > 1
        const bounded = wraps || (!part.sequence && c.textWidth > 0)
        return `<div class="label-text" style="left:${mm(part.x)}mm;top:${mm(part.y)}mm;font-size:${mm(part.size)}mm;width:${mm(width)}mm;text-align:${part.sequence ? 'right' : c.align};font-weight:${c.bold ? 700 : 400};white-space:${wraps ? 'normal' : 'nowrap'};${bounded ? `overflow-wrap:anywhere;max-height:${mm(part.size * part.lines)}mm;overflow:hidden;` : ''}">${escapeHtml(part.text)}</div>`
      }).join('')
      return `<article><div class="qr" style="left:${mm(g.qrX)}mm;top:${mm(g.qrY)}mm;width:${mm(qrWidth)}mm;height:${mm(qrWidth)}mm">${qr}</div>${text}</article>`
    }))
    rows.push(`<section>${labels.join('')}</section>`)
  }
  const paper = c.width * c.columns + c.gap * (c.columns - 1)
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><style>
    @page{size:${paper}mm ${c.height}mm;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#000}
    section{width:${paper}mm;height:${c.height}mm;display:flex;gap:${c.gap}mm;break-after:page;page-break-after:always}section:last-child{break-after:auto;page-break-after:auto}
    article{width:${c.width}mm;height:${c.height}mm;position:relative;overflow:hidden;flex-shrink:0;background:white}
    .qr,.label-text{position:absolute}.qr svg{width:100%;height:100%;display:block}.label-text{font-family:Arial,sans-serif;font-weight:700;line-height:1;white-space:nowrap}
    @media screen{body{background:#eee}section{margin-bottom:4px}}
    </style></head><body>${rows.join('')}</body></html>`
}
