/* =========================================================
   Indicadores bibliométricos da página "Sobre o Professor"
   - data/metrics.json: atualizado automaticamente pelo GitHub Actions
     (Scopus, Web of Science, Google Scholar e IEEE Xplore)
   - ORCID: consultado ao vivo, direto da API pública, a cada abertura
   ========================================================= */
(function () {
  "use strict";

  var ORCID = "0000-0002-7243-9640";

  function set(key, value) {
    if (value === null || value === undefined || value === "") return;
    document.querySelectorAll('[data-metric="' + key + '"]').forEach(function (el) {
      el.textContent = Number(value).toLocaleString("pt-BR");
    });
  }

  function showDate(iso) {
    var el = document.querySelector("[data-metric-date]");
    if (!el || !iso) return;
    var p = iso.split("-");
    el.innerHTML = T("Atualizado em ", "Updated on ", "Actualizado el ") + p[2] + "/" + p[1] + "/" + p[0] + ".";
  }

  function load() {
    fetch("data/metrics.json", { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (m) {
        ["scopus", "wos", "scholar", "ieee", "orcid"].forEach(function (src) {
          var d = m[src] || {};
          Object.keys(d).forEach(function (k) { set(src + "." + k, d[k]); });
        });
        showDate(m.updated);
      })
      .catch(function () { /* mantém os traços */ })
      .then(liveOrcid);
  }

  function liveOrcid() {
    return fetch("https://pub.orcid.org/v3.0/" + ORCID + "/works", { headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.group) set("orcid.works", d.group.length); })
      .catch(function () { /* usa o valor do arquivo, se houver */ });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load);
  else load();
})();
