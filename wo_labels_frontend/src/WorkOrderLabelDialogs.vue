<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { labelPrintPrompt } from './label-print-prompt.js'
import { getExistingLabelNumbers, printLabels } from './qz-tray.js'

// Same dialog markup/classes as the host's App.vue. Host CSS supplies its skin.
const labelPrintDialog = ref(null)
const errorDialog = ref(null)
const errorClose = ref(null)
const actionError = ref(null)
const printNotice = ref('')
const printing = ref(false)
const countMode = ref('automatic')
const appendLabelCount = ref(1)
const extraLabelCount = ref(0)
const existingLabels = ref([])
const selectedLabelNumber = ref('')
const existingAdonanKe = ref(null)
const labelsLoading = ref(false)
const labelsError = ref('')
let labelRequest = 0
const validExtraCount = computed(() => extraLabelCount.value !== '' &&
  Number.isInteger(Number(extraLabelCount.value)) && Number(extraLabelCount.value) >= 0)
const validAppendCount = computed(() => appendLabelCount.value !== '' &&
  Number.isInteger(Number(appendLabelCount.value)) && Number(appendLabelCount.value) >= 1 && Number(appendLabelCount.value) <= 10000)
const latestLabelNumber = computed(() => Math.max(0, ...existingLabels.value.map(row => Number(row.label_number) || 0)))
const totalLabelCount = computed(() => countMode.value === 'automatic'
  ? labelPrintPrompt.labelCount + Number(extraLabelCount.value || 0)
  : countMode.value === 'append' ? Number(appendLabelCount.value || 0) : (selectedLabelNumber.value ? 1 : 0))
const labelCountValid = computed(() => {
  if (countMode.value === 'automatic') return validExtraCount.value && totalLabelCount.value >= 1 && totalLabelCount.value <= 10000
  if (countMode.value === 'append') return existingLabels.value.length > 0 && validAppendCount.value
  return existingLabels.value.some(row => Number(row.label_number) === Number(selectedLabelNumber.value))
})

async function refreshExistingLabels(workOrder = labelPrintPrompt.workOrder) {
  if (!workOrder) return
  printNotice.value = ''
  const request = ++labelRequest
  labelsLoading.value = true
  labelsError.value = ''
  try {
    const result = await getExistingLabelNumbers(workOrder)
    if (request === labelRequest && workOrder === labelPrintPrompt.workOrder) {
      existingLabels.value = result?.labels || []
      existingAdonanKe.value = result?.adonan_ke ?? null
    }
  } catch (error) {
    if (request === labelRequest) {
      existingLabels.value = []
      existingAdonanKe.value = null
      labelsError.value = error.message || 'Gagal memuat nomor urut label.'
    }
  } finally {
    if (request === labelRequest) labelsLoading.value = false
  }
}

watch(() => labelPrintPrompt.workOrder, workOrder => {
  if (!workOrder) return
  countMode.value = 'automatic'
  appendLabelCount.value = 1
  extraLabelCount.value = 0
  existingLabels.value = []
  selectedLabelNumber.value = ''
  existingAdonanKe.value = null
  void refreshExistingLabels(workOrder)
  nextTick(() => {
    if (!labelPrintDialog.value?.open) labelPrintDialog.value?.showModal()
  })
})
watch(actionError, error => {
  if (!error) return
  nextTick(() => {
    if (!errorDialog.value?.open) errorDialog.value?.showModal()
    errorClose.value?.focus()
  })
})

function closeLabelPrint() {
  if (printing.value) return
  if (labelPrintDialog.value?.open) labelPrintDialog.value.close()
  labelRequest++
  countMode.value = 'automatic'
  appendLabelCount.value = 1
  extraLabelCount.value = 0
  existingLabels.value = []
  selectedLabelNumber.value = ''
  existingAdonanKe.value = null
  labelsLoading.value = false
  labelsError.value = ''
  labelPrintPrompt.workOrder = ''
  labelPrintPrompt.labelCount = 0
  labelPrintPrompt.afterSave = ''
}
async function confirmLabelPrint(output = 'printer') {
  const workOrder = labelPrintPrompt.workOrder
  if (!workOrder || !labelCountValid.value || printing.value) return
  printing.value = true
  try {
    const options = countMode.value === 'automatic'
        ? { extra: Number(extraLabelCount.value) }
        : countMode.value === 'append'
          ? { appendCount: Number(appendLabelCount.value) }
         : { labelNumbers: [Number(selectedLabelNumber.value)] }
    if (output === 'browser') options.output = 'browser'
    const result = await printLabels(workOrder, options)
    if (result?.browserFallback) printNotice.value = 'Cetak QZ gagal. Dialog cetak browser dibuka; pilih printer atau Save as PDF. Periksa label yang mungkin sudah tercetak agar tidak rangkap.'
    else if (result?.browserPrint) printNotice.value = 'Dialog cetak browser dibuka. Pilih printer atau Save as PDF; membatalkan dialog tidak menghapus label yang sudah terbit.'
    printing.value = false
    closeLabelPrint()
  } catch (err) {
    actionError.value = {
      title: output === 'browser' ? 'Cetak Browser Gagal' : 'Cetak Label Gagal',
      message: err.message || 'Gagal terhubung ke QZ Tray atau printer.',
      details: [],
      hint: /sign|sertifikat|certificate/i.test(err.message || '')
        ? 'Periksa sertifikat QZ Tray di komputer dan private key di server.'
        : 'Pastikan QZ Tray sedang berjalan di komputer Anda.'
    }
  } finally {
    printing.value = false
  }
}
function closeError() {
  if (errorDialog.value?.open) errorDialog.value.close()
  actionError.value = null
}
</script>

<template>
  <p v-if="printNotice" class="label-print-note" role="status">{{ printNotice }}</p>
  <dialog ref="labelPrintDialog" class="dialog" aria-labelledby="label-print-title" @cancel.prevent="closeLabelPrint" @click.self="closeLabelPrint">
    <h3 id="label-print-title">{{ labelPrintPrompt.afterSave ? `${labelPrintPrompt.afterSave} tersimpan` : 'Cetak label?' }}</h3>
    <p>Cetak label untuk Work Order <strong>{{ labelPrintPrompt.workOrder }}</strong>?</p>
    <p>Usulan otomatis dari Good Qty dan UOM: <strong>{{ labelPrintPrompt.labelCount }} label</strong></p>
    <label for="label-count-mode">Cara menentukan jumlah</label>
    <select id="label-count-mode" v-model="countMode" class="input label-dialog-select" style="display: block; width: 100%; margin-top: 6px">
      <option value="automatic">Otomatis dari Good Qty</option>
      <option value="append" :disabled="labelsLoading || !existingLabels.length">Tambah setelah cetak awal</option>
      <option value="specific">Pilih nomor urut label untuk cetak ulang</option>
    </select>
    <div v-if="countMode === 'automatic'" class="label-count-field">
      <label for="extra-label-count">Label tambahan</label>
      <input id="extra-label-count" v-model.number="extraLabelCount" type="number" min="0" :max="Math.max(0, 10000 - labelPrintPrompt.labelCount)" step="1" inputmode="numeric" class="input" style="display: block; width: 100%; margin-top: 6px">
      <p class="label-print-note">Jumlah awal mengikuti Good Qty.</p>
    </div>
    <div v-if="countMode === 'append'" class="label-count-field">
      <label for="append-label-count">Jumlah label lanjutan</label>
      <input id="append-label-count" v-model.number="appendLabelCount" type="number" min="1" max="10000" step="1" inputmode="numeric" class="input" style="display: block; width: 100%; margin-top: 6px">
      <p v-if="validAppendCount" class="label-print-note">Nomor baru: #{{ latestLabelNumber + 1 }}–#{{ latestLabelNumber + Number(appendLabelCount) }} · setelah label awal yang sudah terbit.</p>
    </div>
    <div v-if="countMode === 'specific'" class="label-count-field">
      <label for="label-number-select">Nomor urut label yang dicetak ulang</label>
      <p class="label-print-note">Nomor urut terikat ke Work Order ini<span v-if="existingAdonanKe !== null"> · Adonan ke {{ existingAdonanKe }}</span>.</p>
      <p v-if="labelsLoading" class="label-print-note">Memuat nomor urut label…</p>
      <p v-else-if="labelsError" class="label-print-note warning">{{ labelsError }}</p>
      <p v-else-if="!existingLabels.length" class="label-print-note">Belum ada label terbit untuk Work Order ini. Cetak otomatis dari Good Qty dahulu.</p>
      <select v-else id="label-number-select" v-model.number="selectedLabelNumber" class="input label-dialog-select" style="display: block; width: 100%; margin-top: 6px">
        <option value="">Pilih nomor label</option>
        <option v-for="row in existingLabels" :key="row.label_number" :value="row.label_number">
          Label #{{ row.label_number }} · Adonan ke {{ row.adonan_ke ?? '—' }}
        </option>
      </select>
      <p v-if="selectedLabelNumber" class="label-print-note">Dipilih: <strong>Label #{{ selectedLabelNumber }}</strong>. QR akan memakai mapping label yang sama.</p>
    </div>
    <p v-if="labelCountValid && countMode === 'automatic'">Total cetak otomatis: <strong>{{ totalLabelCount }} label</strong></p>
    <p v-else-if="labelCountValid && countMode === 'append'">Label lanjutan: <strong>{{ totalLabelCount }} label</strong></p>
    <p v-else-if="labelCountValid && countMode === 'specific'">Total cetak ulang: <strong>{{ totalLabelCount }} label</strong></p>
    <p v-else class="label-print-note warning">{{ countMode === 'append' ? 'Masukkan jumlah label lanjutan 1–10.000.' : countMode === 'specific' ? 'Pilih satu nomor label untuk dicetak ulang.' : 'Masukkan jumlah ekstra bulat yang valid; batas 10.000 label per cetakan.' }}</p>
    <div class="dlg-actions">
      <button class="btn" :disabled="printing" @click="closeLabelPrint">Nanti saja</button>
      <button class="btn btn-primary" :disabled="!labelCountValid || printing" @click="confirmLabelPrint()">{{ printing ? 'Memproses…' : 'Ya, Cetak Label' }}</button>
    </div>
  </dialog>
  <dialog ref="errorDialog" class="dialog error-dialog" aria-labelledby="wo-label-error-title" @cancel.prevent="closeError" @click.self="closeError">
    <div class="error-dialog-icon" aria-hidden="true">!</div>
    <h2 id="wo-label-error-title">{{ actionError?.title }}</h2>
    <p class="error-dialog-message">{{ actionError?.message }}</p>
    <ul v-if="actionError?.details?.length" class="error-dialog-details">
      <li v-for="detail in actionError.details" :key="detail">{{ detail }}</li>
    </ul>
    <div class="dlg-actions">
      <button ref="errorClose" class="btn btn-primary" @click="closeError">Tutup</button>
    </div>
  </dialog>
</template>

<style scoped>
.dlg-actions { flex-wrap: wrap; }
.label-count-field { margin-top: 12px; }
.label-print-note { margin: 6px 0; font-size: 12px; }
.label-print-note.warning { color: var(--danger, #b3261e); }
.label-dialog-select.input {
  appearance: none;
  -webkit-appearance: none;
  height: 34px;
  padding-right: 36px;
  border: 1px solid var(--line2, #d4dde4);
  border-radius: var(--radius, 8px);
  color: var(--ink, #24303a);
  background-color: rgba(255, 255, 255, 0.82);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='m2.5 4.5 3.5 3 3.5-3' fill='none' stroke='%2364707c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px 12px;
  cursor: pointer;
}
.label-dialog-select.input:focus {
  outline: none;
  border-color: var(--accent, #3368a0);
  box-shadow: 0 0 0 3px rgba(102, 163, 191, 0.18);
}
.label-dialog-select option { color: var(--ink, #24303a); background: var(--surface, #fff); }
.label-dialog-select option:disabled { color: var(--muted, #64707c); }
</style>
