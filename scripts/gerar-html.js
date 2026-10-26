// Grava no HTML o menu, o rodapé e a lista de publicações, que antes só existiam
// depois que o JavaScript rodava no navegador. Assim os buscadores leem os links e
// as publicações direto do arquivo. O JavaScript continua montando tudo no navegador.
// Uso: node scripts/gerar-html.js
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..");
var js = path.join(root, "assets", "js");

// ambiente mínimo de navegador: os scripts só definem funções, sem montar a página
var ctx = {
  document: { readyState: "loading", title: "", documentElement: {}, addEventListener: function () {} }
};
ctx.window = ctx;
vm.createContext(ctx);
["site.js", "publicacoes-dados.js", "publicacoes.js"].forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(js, f), "utf8"), ctx, { filename: f });
});

function attr(html, name) {
  var m = html.match(new RegExp("<body[^>]*\\s" + name + '="([^"]*)"'));
  return m ? m[1] : null;
}

fs.readdirSync(root).filter(function (f) { return /\.html$/.test(f); }).forEach(function (f) {
  var file = path.join(root, f);
  var h = fs.readFileSync(file, "utf8");
  var n = h
    .replace(/(<header class="site-header">)[\s\S]*?(<\/header>)/, function (_, a, b) {
      return a + ctx.RB_BUILD.header(attr(h, "data-page"), attr(h, "data-parent")) + b;
    })
    .replace(/(<footer class="site-footer">)[\s\S]*?(<\/footer>)/, function (_, a, b) {
      return a + ctx.RB_BUILD.footer() + b;
    })
    .replace(/(<div id="pub-list">)(?:[\s\S]*?<!-- \/pub-list -->)?<\/div>/, function (_, a) {
      return a + ctx.RB_PUBS(ctx.PUBLICACOES) + "<!-- /pub-list --></div>";
    });
  if (n !== h) {
    fs.writeFileSync(file, n);
    console.log("atualizado " + f);
  }
});
