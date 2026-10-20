import { reactive } from 'vue'

// Copied label-specific UOM check; no dependency on the Production App store.
function hasAlternate(units) {
  return !!units?.displayUom && units.displayUom !== units.stockUom && Number.isFinite(units.qtyInPack) && units.qtyInPack > 0
}

export function labelSource(workOrder) {
  return workOrder.skipPrepacking ? workOrder.postpacking : workOrder.prepacking
}

export function labelCountForWorkOrder(workOrder) {
  const goodQty = Number(labelSource(workOrder)?.goodQty)
  const factor = hasAlternate(workOrder) ? workOrder.qtyInPack : 1
  return Math.max(1, Math.ceil(goodQty / factor - 1e-8))
}

export const labelPrintPrompt = reactive({ workOrder: '', labelCount: 0, afterSave: '' })

export function offerLabelPrint(workOrder, labelCount, afterSave = '') {
  labelPrintPrompt.workOrder = workOrder
  labelPrintPrompt.labelCount = labelCount
  labelPrintPrompt.afterSave = afterSave
}
