import { l as d, d as l } from "./label-layout-Bzm75nKq.js";
async function s() {
  const t = d(), e = JSON.parse(document.getElementById("pqr-layout-data").textContent), o = await l(e, t), n = new DOMParser().parseFromString(o, "text/html");
  document.querySelector("style").textContent = n.querySelector("style").textContent + `
.print-controls{padding:12px;font:13px Arial}@media print{.print-controls{display:none}}`, document.getElementById("pqr-labels").replaceChildren(...n.body.childNodes), document.readyState !== "complete" && await new Promise((r) => window.addEventListener("load", r, { once: !0 }));
  const a = document.getElementById("pqr-print-again");
  a && (a.disabled = !1), window.workOrderLabelReady = !0, new URLSearchParams(window.location.search).get("embedded") !== "1" && window.print();
}
s().catch((t) => {
  const e = document.createElement("p");
  e.textContent = `Layout label gagal dimuat: ${t.message}. Periksa pengaturan sebelum mencetak.`, document.querySelector(".print-controls").append(e);
});
