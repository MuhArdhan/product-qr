import qz from 'qz-tray';
import { loadLayout, normalizeLayout, buildLayoutZpl, SAMPLE_LABEL_DATA } from './label-layout.js';
import { browserLabelPrinter } from './browser-print.js';

export async function findLabelPrinters() {
  await connectQz(null, { layoutTest: true });
  return qz.printers.find();
}

export async function inspectLabelPrinters(raw) {
  const layout = normalizeLayout(raw || loadLayout());
  await connectQz(null, { layoutTest: true, timeoutSeconds: layout.qzTimeout });
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
  await connectQz(null, { layoutTest: true, timeoutSeconds: layout.qzTimeout });
  const printer = layout.printer || await qz.printers.getDefault();
  await qz.print(qz.configs.create(printer, { encoding: 'UTF-8' }), jobs);
  return printer;
}

function serverError(data, fallback) {
  try {
    const messages = JSON.parse(data?._server_messages || '[]');
    const detail = messages.map(message => JSON.parse(message).message).filter(Boolean).join(' ');
    if (detail) return detail;
  } catch (_error) {
    // Keep the generic message if Frappe did not return structured errors.
  }
  return fallback;
}

export async function getExistingLabelNumbers(workOrder) {
  const response = await fetch('/api/method/product_qr.wo_labels.labels.get_existing_label_numbers', {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'X-Frappe-CSRF-Token': window.csrf_token || ''
    },
    body: JSON.stringify({ name: workOrder })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(serverError(data, 'Gagal memuat nomor urut label yang sudah terbit'));
  return data.message || [];
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

export async function connectQz(workOrder, { layoutTest = false, timeoutSeconds = loadLayout()?.qzTimeout } = {}) {
  const seconds = normalizeLayout({ qzTimeout: timeoutSeconds }).qzTimeout;
  configureSigning(workOrder, { layoutTest });
  if (!qz.websocket.isActive()) {
    let timer;
    try {
      await Promise.race([
        qz.websocket.connect({ retries: 0 }),
        new Promise((_, reject) => {
          timer = setTimeout(() => {
            // Do not await disconnect: a stalled WebSocket may also stall close.
            // The rejected race prevents this attempt from continuing to print,
            // even if QZ eventually resolves its connection promise.
            try { Promise.resolve(qz.websocket.disconnect()).catch(() => {}); } catch (_error) { /* best effort */ }
            reject(new Error(`QZ Tray tidak merespons dalam ${seconds} detik.`));
          }, seconds * 1000);
        })
      ]);
    } finally {
      clearTimeout(timer);
    }
  }
}

export async function printLabels(workOrder, printOptions = 0) {
  const options = printOptions && typeof printOptions === 'object'
    ? printOptions
    : { extra: printOptions };
  const request = { name: workOrder, extra: options.extra ?? 0 };
  if (options.appendCount !== undefined) request.append_count = options.appendCount;
  if (options.labelNumbers !== undefined) request.label_numbers = options.labelNumbers;
  // Fetch exactly once: append is not idempotent. Browser print reuses this payload.
  const res = await fetch('/api/method/product_qr.wo_labels.labels.get_label_data', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-Frappe-CSRF-Token': window.csrf_token || ''
    },
    body: JSON.stringify(request)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(serverError(data, 'Gagal mengambil data label'));
  }
  const { message: labelData } = data;

  if (!labelData) {
    throw new Error('Data label kosong');
  }

  const count = labelData.labels?.length || 0;
  if (!count || count !== labelData.label_count) throw new Error('Jumlah label tidak sesuai');
  const layout = loadLayout();
  if (options.output === 'browser') {
    try {
      await browserLabelPrinter.print(labelData, layout);
      return { browserPrint: true };
    } catch (err) {
      throw new Error(`Cetak browser gagal: ${err.message || err}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  }
  try {
    await connectQz(workOrder, { timeoutSeconds: layout?.qzTimeout });
    const printer = layout?.printer || await qz.printers.getDefault();

    const config = qz.configs.create(printer, {
      encoding: 'UTF-8'
    });

    await qz.print(config, buildLayoutZpl(labelData, layout));

    return true;
  } catch (err) {
    console.error('QZ Tray Error:', err);
    try {
      await browserLabelPrinter.print(labelData, layout);
      return { browserFallback: true };
    } catch (browserError) {
      throw new Error(`Cetak gagal: ${err.message || err}. Cetak browser juga gagal: ${browserError.message || browserError}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  }
}
