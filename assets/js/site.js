/* =========================================================
   Prof. Rafael Barros — cabeçalho, rodapé, idioma e galeria
   ========================================================= */
(function () {
  "use strict";

  var LANGS = ["pt", "en", "es"];
  var HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };

  // Texto nos três idiomas como spans alternados pelo CSS
  function T(pt, en, es) {
    return '<span data-l="pt">' + pt + '</span><span data-l="en">' + en + '</span><span data-l="es">' + es + "</span>";
  }
  window.T = T;

  var ICONS = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
    file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
    building: '<path d="M4 21V5l8-3 8 3v16M4 21h16M9 21v-4h6v4M8 8h1M8 12h1M15 8h1M15 12h1"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10 9.2v5.6l5-2.8z" fill="currentColor"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M7.5 10v7M7.5 7v.01M11.5 17v-4a2.5 2.5 0 0 1 5 0v4M11.5 10v7"/>',
    folder: '<path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>',
    message: '<path d="M4 4h16v12H8l-4 4z"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
  }
  window.icon = icon;

  var NAV = [
    { id: "home", href: "index.html", label: T("Início", "Home", "Inicio") },
    { id: "sobre", href: "sobre.html", label: T("Sobre o Professor", "About", "Sobre el Profesor") },
    { id: "ensino", href: "ensino.html", label: T("Ensino", "Teaching", "Docencia") },
    {
      id: "pesquisa", href: "pesquisa.html", label: T("Pesquisa", "Research", "Investigación"),
      sub: [
        { id: "gsel", href: "gsel.html", label: "GSEL" },
        { id: "orientacoes", href: "orientacoes.html", label: T("Orientações", "Supervision", "Orientaciones") },
        { id: "publicacoes", href: "publicacoes.html", label: T("Publicações", "Publications", "Publicaciones") },
        { id: "projetos", href: "projetos.html", label: T("Projetos de PD&amp;I", "R&amp;D&amp;I Projects", "Proyectos de I+D+i") }
      ]
    },
    { id: "contato", href: "contato.html", label: T("Contato", "Contact", "Contacto") }
  ];

  var LOGO = '<img class="brand-mark" src="assets/img/rb/Icon-menu.svg" alt="Prof. Rafael Barros" width="236" height="196">';

  // Bandeiras: Brasil, Reino Unido e Espanha (com brasão simplificado)
  var FLAGS = {
    pt: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#009c3b"/><path d="M15 2.2 27.4 10 15 17.8 2.6 10z" fill="#ffdf00"/><circle cx="15" cy="10" r="4.4" fill="#002776"/><path d="M10.7 9.1a10 10 0 0 1 8.5 2.4" stroke="#fff" stroke-width=".9" fill="none"/></svg>',
    en: '<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><clipPath id="uk-t"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath>' +
      '<rect width="60" height="30" fill="#012169"/><path d="M0 0l60 30M60 0L0 30" stroke="#fff" stroke-width="6"/>' +
      '<path d="M0 0l60 30M60 0L0 30" clip-path="url(#uk-t)" stroke="#c8102e" stroke-width="4"/>' +
      '<path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>',
    es: '<svg viewBox="0 0 750 500" aria-hidden="true"><rect width="750" height="500" fill="#aa151b"/><rect y="125" width="750" height="250" fill="#f1bf00"/>' +
      // colunas de Hércules
      '<g fill="#e8e8e8" stroke="#8c6d1f" stroke-width="5"><rect x="168" y="196" width="26" height="118"/><rect x="336" y="196" width="26" height="118"/></g>' +
      '<g fill="#c8b100"><rect x="160" y="182" width="42" height="16"/><rect x="328" y="182" width="42" height="16"/><rect x="160" y="312" width="42" height="16"/><rect x="328" y="312" width="42" height="16"/></g>' +
      '<g fill="#aa151b"><rect x="168" y="240" width="26" height="12"/><rect x="336" y="240" width="26" height="12"/></g>' +
      // coroa
      '<path d="M222 172l8-32 22 18 13-28 13 28 22-18 8 32z" fill="#c8b100" stroke="#8c6d1f" stroke-width="4"/>' +
      // escudo esquartelado
      '<path d="M215 178h100v92a50 50 0 0 1-100 0z" fill="#aa151b" stroke="#8c6d1f" stroke-width="5"/>' +
      '<path d="M265 180h48v68h-48z" fill="#f0f0f0"/>' +
      '<path d="M217 248h48v52a48 48 0 0 1-48-30z" fill="#f1bf00"/><path d="M227 248h8v62h-8zM245 248h8v66h-8z" fill="#aa151b"/>' +
      '<rect x="230" y="196" width="22" height="30" fill="#f1bf00"/><circle cx="289" cy="212" r="12" fill="#aa151b"/>' +
      '<circle cx="265" cy="302" r="10" fill="#e88a9f"/><circle cx="265" cy="225" r="13" fill="#005bbf" stroke="#c8b100" stroke-width="4"/></svg>'
  };
  function langButton(code, name) {
    return '<button type="button" data-set-lang="' + code + '" title="' + name + '" aria-label="' + name + '">' + FLAGS[code] + "</button>";
  }

  function buildHeader(page, parent) {
    var items = NAV.map(function (n) {
      var active = n.id === page || n.id === parent;
      var sub = "";
      if (n.sub) {
        sub = '<ul class="sub">' + n.sub.map(function (s) {
          return '<li><a href="' + s.href + '"' + (s.id === page ? ' aria-current="page"' : "") + ">" + s.label + "</a></li>";
        }).join("") + "</ul>";
      }
      return '<li class="' + (active ? "active" : "") + '"><a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") + ">" + n.label + "</a>" + sub + "</li>";
    }).join("");

    return '<a class="skip-link" href="#conteudo">' + T("Pular para o conteúdo", "Skip to content", "Saltar al contenido") + "</a>" +
      '<div class="wrap">' +
      '<a class="brand" href="index.html">' + LOGO + "</a>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Menu">' + icon("menu") + "</button>" +
      '<nav class="main-nav" id="main-nav" aria-label="Principal"><ul>' + items + "</ul></nav>" +
      '<div class="lang-switch" role="group" aria-label="Idioma / Language / Idioma">' +
      langButton("pt", "Português") + langButton("en", "English") + langButton("es", "Español") +
      "</div></div>";
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    return '<div class="wrap"><div class="footer-grid">' +
      "<div>" +
      '<img class="footer-logo" src="assets/img/rb/Icon-white.svg" alt="Prof. Rafael Barros" width="236" height="196">' +
      '<span class="fname">Prof. Dr. Rafael M. R. Barros</span>' +
      "<p>" + T(
        "Professor de Engenharia Elétrica do Instituto Federal de Pernambuco (IFPE), campus Garanhuns. Líder do Grupo de Pesquisa em Sistemas Elétricos (GSEL).",
        "Professor of Electrical Engineering at the Federal Institute of Pernambuco (IFPE), Garanhuns campus. Leader of the Electrical Systems Research Group (GSEL).",
        "Profesor de Ingeniería Eléctrica del Instituto Federal de Pernambuco (IFPE), campus Garanhuns. Líder del Grupo de Investigación en Sistemas Eléctricos (GSEL)."
      ) + "</p>" +
      '<div class="social">' +
      '<a href="https://www.linkedin.com/in/rafaelmrbarros/" target="_blank" rel="noopener" aria-label="LinkedIn">' + icon("linkedin") + "</a>" +
      '<a href="https://www.youtube.com/rafaelmrbarros" target="_blank" rel="noopener" aria-label="YouTube">' + icon("youtube") + "</a>" +
      '<a href="mailto:rafael.barros@garanhuns.ifpe.edu.br" aria-label="E-mail">' + icon("mail") + "</a>" +
      "</div></div>" +
      "<div><h4>" + T("Navegação", "Navigation", "Navegación") + "</h4><ul>" +
      NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
      "</ul></div>" +
      "<div><h4>" + T("Perfis acadêmicos", "Academic profiles", "Perfiles académicos") + "</h4><ul>" +
      '<li><a href="http://lattes.cnpq.br/6066634529532605" target="_blank" rel="noopener">Currículo Lattes</a></li>' +
      '<li><a href="https://orcid.org/0000-0002-7243-9640" target="_blank" rel="noopener">ORCID</a></li>' +
      '<li><a href="https://scholar.google.com.br/citations?user=nwmX8RcAAAAJ" target="_blank" rel="noopener">Google Scholar</a></li>' +
      '<li><a href="https://www.scopus.com/authid/detail.uri?authorId=57189575900" target="_blank" rel="noopener">Scopus</a></li>' +
      '<li><a href="https://ieeexplore.ieee.org/author/37089947436" target="_blank" rel="noopener">IEEE Xplore</a></li>' +
      "</ul></div></div>" +
      '<div class="footer-bottom"><span>© ' + year + " Rafael M. R. Barros. " + T("Todos os direitos reservados.", "All rights reserved.", "Todos los derechos reservados.") + "</span></div></div>";
  }

  // ---------- idioma ----------
  var root = document.documentElement;
  var ptTitle = document.title;

  function getLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && LANGS.indexOf(q) > -1) {
      try { localStorage.setItem("rb-lang", q); } catch (e) { /* ignora */ }
      return q;
    }
    try {
      var s = localStorage.getItem("rb-lang");
      if (s && LANGS.indexOf(s) > -1) return s;
    } catch (e) { /* armazenamento indisponível */ }
    return "pt";
  }

  function setLang(lang, save) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", HTML_LANG[lang]);
    document.title = lang === "pt" ? ptTitle : (root.getAttribute("data-title-" + lang) || ptTitle);
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    document.querySelectorAll("[data-ph-" + lang + "]").forEach(function (el) {
      el.setAttribute("placeholder", el.getAttribute("data-ph-" + lang));
    });
    document.querySelectorAll("[data-alt-" + lang + "]").forEach(function (el) {
      el.setAttribute("alt", el.getAttribute("data-alt-" + lang));
    });
    if (save) {
      try { localStorage.setItem("rb-lang", lang); } catch (e) { /* ignora */ }
    }
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  window.currentLang = function () { return root.getAttribute("data-lang") || "pt"; };

  // ---------- montagem ----------
  function init() {
    var body = document.body;
    var header = document.querySelector("header.site-header");
    var footer = document.querySelector("footer.site-footer");
    if (header) header.innerHTML = buildHeader(body.getAttribute("data-page"), body.getAttribute("data-parent"));
    if (footer) footer.innerHTML = buildFooter();

    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-set-lang]");
      if (b) setLang(b.getAttribute("data-set-lang"), true);
    });

    var toggle = document.querySelector(".nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = header.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // ícones declarados no HTML: <i data-icon="mail"></i>
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      el.outerHTML = icon(el.getAttribute("data-icon"), el.getAttribute("class") || "");
    });

    initGallery();
    setLang(getLang(), false);
  }

  function initGallery() {
    var track = document.querySelector(".gallery-track");
    if (!track) return;
    var step = function () { return track.clientWidth * 0.9; };
    var prev = document.querySelector("[data-gallery-prev]");
    var next = document.querySelector("[data-gallery-next]");
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = '<button type="button" aria-label="Fechar / Close">×</button><img alt="">';
    document.body.appendChild(box);
    var big = box.querySelector("img");
    function close() { box.classList.remove("open"); }
    box.addEventListener("click", function (e) { if (e.target !== big) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    track.querySelectorAll("img").forEach(function (img) {
      img.parentElement.setAttribute("tabindex", "0");
      function open() { big.src = img.src; big.alt = img.alt; box.classList.add("open"); box.querySelector("button").focus(); }
      img.parentElement.addEventListener("click", open);
      img.parentElement.addEventListener("keydown", function (e) { if (e.key === "Enter") open(); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
