<script setup>
import { Printer } from 'lucide-vue-next'
import { labelCountForWorkOrder, labelSource, offerLabelPrint } from './label-print-prompt.js'

defineProps({ workOrder: { type: Object, required: true } })
</script>

<template>
  <div v-if="labelSource(workOrder)?.confirmed" class="toolbar ws-label-actions">
    <button class="btn ws-label-print" type="button" @click="offerLabelPrint(workOrder.id, labelCountForWorkOrder(workOrder))">
      <Printer :size="14" :stroke-width="2" /> Cetak Label
    </button>
  </div>
</template>

<style scoped>
.ws-label-actions { justify-content: flex-end; }
.ws-label-print { display: inline-flex; align-items: center; gap: 6px; text-decoration: none; }
</style>
