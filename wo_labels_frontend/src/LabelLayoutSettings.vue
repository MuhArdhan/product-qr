<script setup>
import { computed, onMounted, ref } from 'vue'
import { QrCode } from 'lucide-vue-next'
import { LAYOUT_DEFAULTS, LAYOUT_NUMBERS, loadLayout, normalizeLayout, saveLayout, resetLayout } from './label-layout.js'
import { inspectLabelPrinters, printTestLabel } from './qz-tray.js'
import { describeLabelPrinter } from './label-printer-status.js'

const draft = ref(loadLayout() || { ...LAYOUT_DEFAULTS })
const normalized = computed(() => normalizeLayout(draft.value))
const printers = ref([])
const defaultPrinter = ref('')
const printersLoaded = ref(false)
const lastPrinted = ref('')
const busy = ref(false)
const message = ref('')
const failed = ref(false)
const options = computed(() => [...new Set([draft.value.printer, ...printers.value].filter(Boolean))])
const destination = computed(() => describeLabelPrinter({ selected: draft.value.printer,
  printers: printers.value, defaultPrinter: defaultPrinter.value, loaded: printersLoaded.value, lastPrinted: lastPrinted.value }))
const leftFields = LAYOUT_NUMBERS.filter(f => ['leftX', 'leftY', 'qrSize'].includes(f.key))
const textFields = LAYOUT_NUMBERS.filter(f => ['rightX', 'rightY', 'textWidth', 'prefixFontSize', 'fontSize', 'productFontSize', 'lineHeight', 'nameLines'].includes(f.key))
const timeoutField = LAYOUT_NUMBERS.find(f => f.key === 'qzTimeout')
const mediaFields = LAYOUT_NUMBERS.filter(f => f !== timeoutField && !leftFields.includes(f) && !textFields.includes(f))
async function run(action, success) {
  if (busy.value) return
  busy.value = true
  message.value = ''
  failed.value = false
  try { await action(); message.value = success }
  catch (error) { failed.value = true; message.value = error.message || 'Pengaturan label gagal.' }
  finally { busy.value = false }
}
function save() {
  run(() => { draft.value = saveLayout(draft.value) }, 'Pengaturan label disimpan di perangkat ini.')
}
function reset() {
  run(() => { resetLayout(); draft.value = { ...LAYOUT_DEFAULTS } }, 'Kembali menggunakan default ZPL asli.')
}
function refresh() {
  run(async () => {
    try {
      const found = await inspectLabelPrinters(normalized.value)
      printers.value = found.printers
      defaultPrinter.value = found.defaultPrinter
      printersLoaded.value = true
    } catch (error) {
      printers.value = []
      defaultPrinter.value = ''
      printersLoaded.value = false
      lastPrinted.value = ''
      throw error
    }
  }, 'Daftar printer diperbarui.')
}
function testPrint() {
  run(async () => {
    const layout = normalized.value
    const printer = await printTestLabel(layout)
    lastPrinted.value = printer
    if (!layout.printer) defaultPrinter.value = printer
  }, 'Label TEST dikirim. Tidak ada serial produksi yang dibuat.')
}
onMounted(refresh)
</script>

<template>
  <section class="panel settings-panel pqr-layout" aria-labelledby="pqr-layout-title">
    <div class="panel-head">
      <span class="p-ico"><QrCode :size="15" :stroke-width="1.9" /></span>
      <h2 id="pqr-layout-title">Pengaturan layout label</h2>
      <span class="lead">Khusus browser dan perangkat ini.</span>
    </div>
    <div class="panel-body">
      <div class="settings-block">
        <div class="settings-block-head">
          <h3>Printer label</h3>
          <p class="hint">Daftar printer dimuat otomatis saat pengaturan dibuka. Gunakan printer ZPL. Cetak TEST hanya untuk memeriksa layout dengan data contoh, tanpa Work Order.</p>
        </div>
        <div class="settings-control">
          <div class="form-grid cols2">
            <div class="field">
              <label for="pqr-printer">Printer label</label>
              <select id="pqr-printer" v-model="draft.printer" class="input">
                <option value="">{{ defaultPrinter ? `Default sistem — ${defaultPrinter}` : 'Printer default sistem (nama belum dimuat)' }}</option>
                <option v-for="printer in options" :key="printer" :value="printer">{{ printer }}{{ printersLoaded && !printers.includes(printer) ? ' — belum terdeteksi' : '' }}</option>
              </select>
            </div>
            <div class="field">
              <label for="pqr-qzTimeout">{{ timeoutField.label }}</label>
              <input id="pqr-qzTimeout" v-model.number="draft.qzTimeout" class="input" type="number" :min="timeoutField.min" :max="timeoutField.max" :step="timeoutField.step" aria-describedby="pqr-timeout-note">
            </div>
          </div>
          <p id="pqr-timeout-note" class="hint">1–60 detik; default 8. Batas menunggu koneksi QZ, bukan durasi cetak fisik. Simpan agar dipakai saat cetak Work Order. Jika koneksi gagal atau timeout, cetak Work Order beralih ke dialog cetak browser.</p>
          <p class="settings-note" data-label-printer-destination aria-live="polite">Printer tujuan: <strong>{{ destination.name }}</strong><br>{{ destination.detail }}</p>
          <div class="pqr-layout-actions">
            <button type="button" class="btn" :disabled="busy" @click="refresh">Muat ulang printer</button>
            <button type="button" class="btn" :disabled="busy" @click="testPrint">Cetak label TEST</button>
          </div>
        </div>
      </div>
      <div class="settings-block">
        <div class="settings-block-head">
          <h3>Ukuran dan media</h3>
          <p class="hint">Dasar ZPL asli: 2 kolom, ^PW800, ^LL160, 203 DPI. Pengaturan ini hanya untuk penyesuaian.</p>
        </div>
        <div class="settings-control">
          <div class="form-grid cols2">
            <div v-for="f in mediaFields" :key="f.key" class="field">
              <label :for="`pqr-${f.key}`">{{ f.label }}</label>
              <select v-if="f.key === 'dpi'" :id="`pqr-${f.key}`" v-model.number="draft.dpi" class="input">
                <option :value="203">203</option><option :value="300">300</option><option :value="600">600</option>
              </select>
              <input v-else :id="`pqr-${f.key}`" v-model.number="draft[f.key]" class="input" type="number" :min="f.min" :max="f.max" :step="f.step">
            </div>
          </div>
          <p class="hint">Lebar media: {{ normalized.width * normalized.columns + normalized.gap * (normalized.columns - 1) }} mm.</p>
          <p class="settings-note">Margin tambahan 0 mempertahankan posisi asli. Pengaturan konten kiri/kanan di bawah berlaku di dalam setiap label, bukan untuk membedakan dua kolom cetak. Samakan ukuran media dan sensor gap di printer.</p>
        </div>
      </div>
      <div class="settings-block">
        <div class="settings-block-head">
          <h3>Konten kiri — QR</h3>
          <p class="hint">Atur posisi dan ukuran QR tanpa menggeser konten kanan. QR selalu dicetak dengan identitas serial yang sama.</p>
        </div>
        <div class="settings-control">
          <div class="form-grid cols2">
            <div v-for="f in leftFields" :key="f.key" class="field">
              <label :for="`pqr-${f.key}`">{{ f.label }}</label>
              <input :id="`pqr-${f.key}`" v-model.number="draft[f.key]" class="input" type="number" :min="f.min" :max="f.max" :step="f.step">
            </div>
          </div>
          <p class="settings-note">Geser 0 memakai posisi ZPL asli. Nilai negatif menggeser ke kiri/atas, positif ke kanan/bawah; posisi tidak melewati titik nol media. QR acuan 16 memakai magnifikasi 4 pada 203 DPI. Perbesar area label bila konten terpotong.</p>
        </div>
      </div>
      <div class="settings-block">
        <div class="settings-block-head">
          <h3>Konten kanan — Teks</h3>
          <p class="hint">Atur blok prefix, nama produk, SKU, MFG, EXP, footer dan nomor urut secara terpisah dari QR. Nama produk tetap dicetak.</p>
        </div>
        <div class="settings-control">
          <div class="form-grid cols2">
            <div v-for="f in textFields" :key="f.key" class="field">
              <label :for="`pqr-${f.key}`">{{ f.label }}</label>
              <input :id="`pqr-${f.key}`" v-model.number="draft[f.key]" class="input" type="number" :min="f.min" :max="f.max" :step="f.step">
            </div>
            <div class="field">
              <label for="pqr-align">Perataan teks</label>
              <select id="pqr-align" v-model="draft.align" class="input"><option value="left">Kiri</option><option value="center">Tengah</option><option value="right">Kanan</option></select>
            </div>
            <div class="field wide">
              <label for="pqr-footer">Footer</label>
              <input id="pqr-footer" v-model="draft.footer" maxlength="100" class="input">
            </div>
          </div>
          <p class="settings-note">Lebar 0 mengikuti sisa area label; ukuran prefix 0 mengikuti font asli. Jumlah baris nama menambah ruang sebelum SKU/MFG/EXP. Geser teks juga memindahkan nomor urut, tanpa menggeser QR. Periksa hasil penyesuaian dengan cetak TEST.</p>
        </div>
      </div>
    </div>
    <div v-if="message" class="settings-alerts">
      <p role="status" :class="failed ? 'err' : 'hint'">{{ message }}</p>
    </div>
    <div class="panel-foot">
      <button type="button" class="btn btn-primary" :disabled="busy" @click="save">Simpan layout label</button>
      <button type="button" class="btn" :disabled="busy" @click="reset">Pulihkan default ZPL</button>
    </div>
  </section>
</template>

<style>
.pqr-layout { min-width: 0; }
.pqr-layout-actions { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
