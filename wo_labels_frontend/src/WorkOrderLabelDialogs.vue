<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { labelPrintPrompt } from './label-print-prompt.js'
import { printLabels } from './qz-tray.js'

// Same dialog markup/classes as the host's App.vue. Host CSS supplies its skin.
const labelPrintDialog = ref(null)
const errorDialog = ref(null)
const errorClose = ref(null)
const actionError = ref(null)
const extraLabelCount = ref(0)
const labelCountValid = computed(() =>
  extraLabelCount.value !== '' &&
  Number.isInteger(Number(extraLabelCount.value)) &&
  Number(extraLabelCount.value) >= 0 &&
  labelPrintPrompt.labelCount + Number(extraLabelCount.value) <= 10000
)
const totalLabelCount = computed(() => labelPrintPrompt.labelCount + Number(extraLabelCount.value || 0))

watch(() => labelPrintPrompt.workOrder, workOrder => {
  if (!workOrder) return
  extraLabelCount.value = 0
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
  if (labelPrintDialog.value?.open) labelPrintDialog.value.close()
  extraLabelCount.value = 0
  labelPrintPrompt.workOrder = ''
  labelPrintPrompt.labelCount = 0
  labelPrintPrompt.afterSave = ''
}
async function confirmLabelPrint() {
  const workOrder = labelPrintPrompt.workOrder
  if (!workOrder || !labelCountValid.value) return
  try {
    await printLabels(workOrder, Number(extraLabelCount.value))
    closeLabelPrint()
  } catch (err) {
    actionError.value = {
      title: 'Cetak Label Gagal',
      message: err.message || 'Gagal terhubung ke QZ Tray atau printer.',
      details: [],
      hint: /sign|sertifikat|certificate/i.test(err.message || '')
        ? 'Periksa sertifikat QZ Tray di komputer dan private key di server.'
        : 'Pastikan QZ Tray sedang berjalan di komputer Anda.'
    }
  }
}
function closeError() {
  if (errorDialog.value?.open) errorDialog.value.close()
  actionError.value = null
}
</script>

<template>
  <dialog ref="labelPrintDialog" class="dialog" aria-labelledby="label-print-title" @cancel.prevent="closeLabelPrint" @click.self="closeLabelPrint">
    <h3 id="label-print-title">{{ labelPrintPrompt.afterSave ? `${labelPrintPrompt.afterSave} tersimpan` : 'Cetak label?' }}</h3>
    <p>Cetak label untuk Work Order <strong>{{ labelPrintPrompt.workOrder }}</strong>?</p>
    <p>Label sesuai Good Qty: {{ labelPrintPrompt.labelCount }}</p>
    <label for="extra-label-count">Label tambahan</label>
    <input id="extra-label-count" v-model.number="extraLabelCount" type="number" min="0" :max="Math.max(0, 10000 - labelPrintPrompt.labelCount)" step="1" inputmode="numeric" class="input" style="display: block; width: 100%; margin-top: 6px">
    <p v-if="labelCountValid">Total cetak: <strong>{{ totalLabelCount }} label</strong></p>
    <p v-else style="color: #b3261e">Masukkan bilangan bulat 0 atau lebih; maksimal 10.000 label per cetakan.</p>
    <div class="dlg-actions">
      <button class="btn" @click="closeLabelPrint">Nanti saja</button>
      <button class="btn btn-primary" :disabled="!labelCountValid" @click="confirmLabelPrint">Ya, Cetak Label</button>
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
