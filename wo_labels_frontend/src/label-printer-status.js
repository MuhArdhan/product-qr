// QZ discovery lists OS printer queues; it does not prove a device is online.
export function describeLabelPrinter({ selected = '', printers = [], defaultPrinter = '', loaded = false, lastPrinted = '' } = {}) {
  const name = selected || defaultPrinter
  if (!name) return {
    name: 'Belum diketahui',
    detail: loaded ? 'Printer default sistem belum tersedia. Pilih printer dari daftar.' : 'Klik Hubungkan / muat printer untuk melihat nama printer.'
  }
  if (loaded && printers.includes(name)) return { name, detail: 'Terdeteksi oleh QZ Tray. Status fisik online/offline belum diperiksa.' }
  if (lastPrinted === name) return { name, detail: 'Tujuan cetak TEST terakhir. Pengiriman job bukan konfirmasi hasil cetak fisik.' }
  return { name, detail: loaded ? 'Belum terdeteksi dalam daftar QZ Tray. Periksa printer atau muat ulang daftar.' : 'Nama tersimpan; belum diverifikasi oleh QZ Tray.' }
}
