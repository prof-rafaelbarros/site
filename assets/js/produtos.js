/* =========================================================
   Filtro e busca da página de produtos tecnológicos
   ========================================================= */
(function () {
  "use strict";

  function init() {
    var items = document.querySelectorAll("#prod-list .product");
    var input = document.getElementById("prod-search");
    var empty = document.getElementById("prod-empty");
    var buttons = document.querySelectorAll("[data-pfilter]");
    var filter = "all";

    function apply() {
      var q = (input.value || "").trim().toLowerCase();
      var shown = 0;
      items.forEach(function (el) {
        var ok = (filter === "all" || el.getAttribute("data-type") === filter) &&
          (!q || el.textContent.toLowerCase().indexOf(q) > -1);
        el.hidden = !ok;
        if (ok) shown++;
      });
      empty.hidden = shown > 0;
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        filter = b.getAttribute("data-pfilter");
        buttons.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        apply();
      });
    });
    input.addEventListener("input", apply);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
