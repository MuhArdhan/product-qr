import { createApp, h, shallowReactive } from 'vue'
import WorkOrderLabelButton from './WorkOrderLabelButton.vue'
import WorkOrderLabelDialogs from './WorkOrderLabelDialogs.vue'
import LabelLayoutSettings from './LabelLayoutSettings.vue'
import { labelCountForWorkOrder, offerLabelPrint } from './label-print-prompt.js'

const selector = '[data-product-qr-slot]'
let started = false

export function onPackingSaved({ detail }) {
  const { workOrder, stage } = detail || {}
  if (!workOrder?.id) return
  if ((stage === 'prepacking' && !workOrder.skipPrepacking) ||
      (stage === 'postpacking' && workOrder.skipPrepacking)) {
    offerLabelPrint(workOrder.id, labelCountForWorkOrder(workOrder),
      stage === 'prepacking' ? 'Pre-Packing' : 'Post-Packing')
  }
}

// Independent Vue apps own only the interiors of explicit host slots. No host
// Vue internals or DOM-selector guessing; removed slots are unmounted on routing.
export function start() {
  if (started) return
  started = true
  const css = document.createElement('link')
  css.rel = 'stylesheet'
  const cssUrl = new URL(/* @vite-ignore */ './runtime.css', import.meta.url)
  cssUrl.search = new URL(import.meta.url).search
  css.href = cssUrl.href
  document.head.appendChild(css)
  const dialogs = document.createElement('div')
  dialogs.dataset.productQrDialogs = ''
  document.body.appendChild(dialogs)
  createApp(WorkOrderLabelDialogs).mount(dialogs)
  const mounted = new Map()
  function sync() {
    for (const [slot, entry] of mounted) {
      if (!slot.isConnected) {
        entry.app.unmount()
        mounted.delete(slot)
      }
    }
    for (const slot of document.querySelectorAll(selector)) {
      const kind = slot.dataset.productQrSlot
      if (!['actions', 'settings'].includes(kind)) continue
      const value = slot.dataset.workOrder || '{}'
      let entry = mounted.get(slot)
      if (entry?.value === value) continue
      let workOrder
      try { workOrder = JSON.parse(value) } catch { continue }
      if (!entry) {
        const state = shallowReactive({ workOrder })
        const app = createApp({ render: () => kind === 'settings'
          ? h(LabelLayoutSettings) : h(WorkOrderLabelButton, { workOrder: state.workOrder }) })
        entry = { app, state, value }
        mounted.set(slot, entry)
        app.mount(slot)
      } else {
        entry.value = value
        entry.state.workOrder = workOrder
      }
    }
  }
  const observer = new MutationObserver(sync)
  observer.observe(document.body, {
    childList: true, subtree: true, attributes: true,
    attributeFilter: ['data-work-order', 'data-product-qr-slot']
  })
  window.addEventListener('production:packing-saved', onPackingSaved)
  sync()
}
