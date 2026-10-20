export function workOrderLabelUrl(workOrder, extraLabels = 0) {
  const url = `/product_qr_work_order_label?name=${encodeURIComponent(workOrder)}`
  return extraLabels > 0 ? `${url}&extra=${extraLabels}` : url
}
