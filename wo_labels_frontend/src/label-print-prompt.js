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

// Issued ordinals within [from, to] (either order). Gaps are skipped, never invented.
export function labelNumbersInRange(labels, from, to) {
  const a = Number(from), b = Number(to)
  if (from === '' || to === '' || !Number.isInteger(a) || !Number.isInteger(b)) return []
  const [lo, hi] = a <= b ? [a, b] : [b, a]
  return [...new Set(labels.map(row => Number(row.label_number)))]
    .filter(n => n >= lo && n <= hi).sort((x, y) => x - y)
}

export const labelPrintPrompt =reactive({ workOrder: '', labelCount: 0, afterSave: '' })

export function offerLabelPrint(workOrder, labelCount, afterSave = '') {
  labelPrintPrompt.workOrder = workOrder
  labelPrintPrompt.labelCount = labelCount
  labelPrintPrompt.afterSave = afterSave
}
