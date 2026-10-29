/* =========================================================
   Renderização da página de publicações (filtros e busca)
   ========================================================= */
(function () {
  "use strict";

  var L = {
    publisher: T("Editora", "Publisher", "Editorial"),
    book: T("Livro", "Book", "Libro"),
    volume: T("Volume", "Volume", "Volumen"),
    journal: T("Revista", "Journal", "Revista"),
    event: T("Evento", "Event", "Evento"),
    chapter: T("Capítulo", "Chapter", "Capítulo"),
    abstract: T("Resumo", "Abstract", "Resumen"),
    readBook: T("Acessar livro", "View book", "Ver libro"),
    readPaper: T("Ler artigo", "Read paper", "Leer artículo"),
    origPt: T("Resumo no idioma original da publicação (português).", "Abstract in the original language of the publication (Portuguese).", "Resumen en el idioma original de la publicación (portugués)."),
    origEn: T("Resumo no idioma original da publicação (inglês).", "Abstract in the original language of the publication (English).", "Resumen en el idioma original de la publicación (inglés)."),
    empty: T("Nenhuma publicação encontrada para esta busca.", "No publications match this search.", "No se encontraron publicaciones para esta búsqueda.")
  };

  var GROUPS = [
    { type: "book", title: T("Livros e capítulos", "Books and chapters", "Libros y capítulos"), abbr: "" },
    { type: "journal", title: T("Revistas científicas", "Scientific journals", "Revistas científicas"), abbr: "" },
    { type: "conf", title: T("Anais de congressos", "Conference proceedings", "Actas de congresos"), abbr: "" }
  ];

  // Tradução de nomes de lugares (cidade/país)
  var PLACES = {
    "Brasil": ["Brazil", "Brasil"], "EUA": ["USA", "EE. UU."], "Países Baixos": ["Netherlands", "Países Bajos"],
    "Índia": ["India", "India"], "Inglaterra": ["England", "Inglaterra"], "Polônia": ["Poland", "Polonia"],
    "Suécia": ["Sweden", "Suecia"], "Amsterdã": ["Amsterdam", "Ámsterdam"], "Londres": ["London", "Londres"],
    "Estocolmo": ["Stockholm", "Estocolmo"], "Nova York": ["New York", "Nueva York"], "São Francisco": ["San Francisco", "San Francisco"],
    "Havana": ["Havana", "La Habana"], "Bélgica": ["Belgium", "Bélgica"],
    "Bruxelas": ["Brussels", "Bruselas"]
  };
  function place(loc) {
    var parts = loc.split(", ");
    function tr(i) { return parts.map(function (p) { return PLACES[p] ? PLACES[p][i] : p; }).join(", "); }
    return T(loc, tr(0), tr(1));
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function link(text, url) {
    return url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(text) + "</a>" : esc(text);
  }

  // Eventos: [trecho do nome, sigla exibida na capa]
  var EVENTS = [
    ["Seminário Nacional de Distribuição", "SENDI"],
    ["CIRED", "CIRED"],
    ["CBGD", "CBGD"],
    ["Inovação na Distribuição", "CIDE"],
    ["Open Innovation", "CICOI"],
    ["IFPB campus Cajazeiras", "IFPB"],
    ["Pós-graduação do IFPB", "SIMPIF"],
    ["IWADA", "IWADA"],
    ["EGSE", "EGSE"],
    ["Simpósio Brasileiro de Sistemas Elétricos", "SBSE"],
    ["(ISH)", "ISH"],
    ["IPMHVC", "IPMHVC"],
    ["ERIAC", "ERIAC"],
    ["(EMD)", "EMD"],
    ["ICHVE", "ICHVE"],
    ["CLAGTEE", "CLAGTEE"],
    ["ALTAE", "ALTAE"]
  ];

  function cover(p) {
    if (p.cover) return '<div class="pub-cover"><img src="assets/img/pub/' + p.cover + '" alt="" loading="lazy"></div>';
    var name = p.meta[0][1];
    var ev = EVENTS.filter(function (e) { return name.indexOf(e[0]) > -1; })[0];
    var short = ev ? ev[1] : name.split(/[\s:]/)[0];
    return '<div class="pub-cover ph"><div><span>' + esc(short) + "</span><small>" + p.year + "</small></div></div>";
  }

  function item(p) {
    var meta = p.meta.map(function (m) {
      return "<span><b>" + L[m[0]] + ":</b> " + link(m[1], m[2]) + "</span>";
    }).join("");
    meta += '<span class="pub-where">' + icon("pin", "pin") + place(p.loc) + '<span class="dot">·</span>' + p.year + "</span>";
    var cta = p.type === "book" ? L.readBook : L.readPaper;
    return '<li class="pub" data-type="' + p.type + '" data-search="' + esc((p.title + " " + p.meta.map(function (m) { return m[1]; }).join(" ") + " " + p.year + " " + p.abs).toLowerCase()) + '">' +
      cover(p) +
      "<div>" +
      "<h3>" + (p.chapter ? '<span class="muted" style="font-weight:500">' + L.chapter + " · </span>" : "") + esc(p.title) + "</h3>" +
      '<div class="pub-meta">' + meta + "</div>" +
      '<div class="pub-actions">' +
      '<a class="btn btn-outline btn-sm" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + cta + " " + icon("ext") + "</a>" +
      "</div>" +
      "<details><summary>" + L.abstract + "</summary>" +
      '<div class="abstract" lang="' + (p.al === "en" ? "en" : "pt-BR") + '">' + esc(p.abs) +
      '<span class="lang-note">' + (p.al === "en" ? L.origEn : L.origPt) + "</span></div></details>" +
      "</div></li>";
  }

  function markup(data) {
    var html = "";
    GROUPS.forEach(function (g) {
      var list = data.filter(function (p) { return p.type === g.type; });
      html += '<section class="pub-group" data-group="' + g.type + '" id="' + g.type + '">' +
        '<h2 class="section-title">' + g.title + ' <span class="count" data-count>' + list.length + "</span></h2>" +
        '<ul class="pub-list">' + list.map(item).join("") + "</ul></section>";
    });
    return html + '<p class="empty" hidden>' + L.empty + "</p>";
  }
  // usado por scripts/gerar-html.js para gravar a lista no HTML
  window.RB_PUBS = markup;

  function render() {
    var data = window.PUBLICACOES || [];
    var out = document.getElementById("pub-list");
    out.innerHTML = markup(data);

    // contadores dos filtros
    document.querySelectorAll("[data-filter]").forEach(function (b) {
      var f = b.getAttribute("data-filter");
      var n = f === "all" ? data.length : data.filter(function (p) { return p.type === f; }).length;
      b.insertAdjacentHTML("beforeend", '<span class="n">' + n + "</span>");
    });

    var filter = "all";
    var input = document.getElementById("pub-search");
    function apply() {
      var q = (input.value || "").trim().toLowerCase();
      var total = 0;
      out.querySelectorAll(".pub-group").forEach(function (sec) {
        var shown = 0;
        sec.querySelectorAll(".pub").forEach(function (li) {
          var ok = (filter === "all" || li.getAttribute("data-type") === filter) && (!q || li.getAttribute("data-search").indexOf(q) > -1);
          li.hidden = !ok;
          if (ok) shown++;
        });
        sec.hidden = shown === 0;
        sec.querySelector("[data-count]").textContent = shown;
        total += shown;
      });
      out.querySelector(".empty").hidden = total > 0;
    }
    document.querySelectorAll("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        filter = b.getAttribute("data-filter");
        document.querySelectorAll("[data-filter]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        apply();
      });
    });
    input.addEventListener("input", apply);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
