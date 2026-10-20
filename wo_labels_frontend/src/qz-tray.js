import qz from 'qz-tray';
import { loadLayout, normalizeLayout, buildLayoutZpl, SAMPLE_LABEL_DATA } from './label-layout.js';

export async function findLabelPrinters() {
  await connectQz(null, { layoutTest: true });
  return qz.printers.find();
}

export async function inspectLabelPrinters() {
  await connectQz(null, { layoutTest: true });
  const [found, systemDefault] = await Promise.allSettled([qz.printers.find(), qz.printers.getDefault()]);
  if (found.status === 'rejected') throw found.reason;
  return {
    printers: Array.isArray(found.value) ? found.value : found.value ? [found.value] : [],
    defaultPrinter: systemDefault.status === 'fulfilled' ? systemDefault.value || '' : ''
  };
}

export async function printTestLabel(raw) {
  const layout = normalizeLayout(raw);
  const jobs = buildLayoutZpl(SAMPLE_LABEL_DATA, layout);
  await connectQz(null, { layoutTest: true });
  const printer = layout.printer || await qz.printers.getDefault();
  await qz.print(qz.configs.create(printer, { encoding: 'UTF-8' }), jobs);
  return printer;
}

function configureSigning(workOrder, { layoutTest = false } = {}) {
  qz.security.setCertificatePromise(async () => {
    const endpoint = layoutTest ? '/api/method/product_qr.wo_labels.qz_signing.layout_certificate'
      : `/api/method/product_qr.wo_labels.qz_signing.certificate?work_order=${encodeURIComponent(workOrder)}`;
    const response = await fetch(endpoint, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Sertifikat QZ Tray belum tersedia atau akses ditolak');
    return (await response.json()).message;
  }, { rejectOnFailure: true });

  qz.security.setSignatureAlgorithm('SHA512');
  qz.security.setSignaturePromise(async request => {
    const response = await fetch(layoutTest ? '/api/method/product_qr.wo_labels.qz_signing.layout_sign' : '/api/method/product_qr.wo_labels.qz_signing.sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Frappe-CSRF-Token': window.csrf_token || ''
      },
      credentials: 'same-origin',
      cache: 'no-store',
      body: JSON.stringify(layoutTest ? { request } : { work_order: workOrder, request })
    });
    if (!response.ok) throw new Error('Gagal menandatangani permintaan QZ Tray');
    return (await response.json()).message;
  });
}

export async function connectQz(workOrder, options) {
  configureSigning(workOrder, options);
  if (!qz.websocket.isActive()) {
    await qz.websocket.connect({ retries: 2, delay: 1 });
  }
}

export async function printLabels(workOrder, extraCount = 0) {
  try {
    await connectQz(workOrder);
    const res = await fetch('/api/method/product_qr.wo_labels.labels.get_label_data', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Frappe-CSRF-Token': window.csrf_token || ''
      },
      body: JSON.stringify({ name: workOrder, extra: extraCount })
    });
    const data = await res.json();
    if (!res.ok) {
      let detail = '';
      try {
        const messages = JSON.parse(data._server_messages || '[]');
        detail = messages.map(message => JSON.parse(message).message).filter(Boolean).join(' ');
      } catch (_error) {
        // Keep the generic message if Frappe did not return structured errors.
      }
      throw new Error(detail || 'Gagal mengambil data label');
    }
    const { message: labelData } = data;

    if (!labelData) {
      throw new Error('Data label kosong');
    }

    const layout = loadLayout();
    let printer = layout?.printer || await qz.printers.getDefault();

    const count = labelData.labels?.length || 0;
    if (!count || count !== labelData.label_count) throw new Error('Jumlah serial label tidak sesuai');

    const config = qz.configs.create(printer, {
      encoding: 'UTF-8'
    });

    await qz.print(config, buildLayoutZpl(labelData, layout));

    return true;
  } catch (err) {
    console.error('QZ Tray Error:', err);
    throw err;
  }
}
