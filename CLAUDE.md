# Instruções para o Claude

Site estático do Prof. Rafael Barros, publicado pelo GitHub Pages a partir da raiz do branch
`main` em https://prof-rafaelbarros.github.io/site/. O `README.md` descreve as páginas, a
estrutura de pastas e as tarefas comuns; leia-o antes de alterar o site.

## Comunicação

- Responda em português, de forma objetiva e didática.
- O usuário edita arquivos também pela interface web do GitHub (ex.: "Add files via upload").
  Antes de trabalhar, atualize o repositório (`git fetch origin main`) para partir da versão
  mais recente.

## Regras de edição

- Todo texto visível existe em três idiomas: `<span data-l="pt">…</span><span data-l="en">…</span><span data-l="es">…</span>`
  (em JS, a função `T(pt, en, es)`). Ao criar ou alterar texto, mantenha as três versões.
  Títulos traduzidos ficam em `data-title-en`/`data-title-es` no `<html>`; `alt` e
  `placeholder` traduzidos, em `data-alt-*` e `data-ph-*`.
- Menu e rodapé: edite apenas `assets/js/site.js` (`NAV`, `buildHeader`, `buildFooter`).
- Publicações: edite apenas `assets/js/publicacoes-dados.js` (e `EVENTS` em
  `assets/js/publicacoes.js` para siglas de congressos).
- O conteúdo entre `<header class="site-header">`, `<footer class="site-footer">` e
  `<div id="pub-list">…<!-- /pub-list --></div>` é gerado: não edite à mão.
- Página nova: copie o `<head>` de uma existente (descrição, canonical, Open Graph,
  favicon) e inclua-a em `sitemap.xml` e em `NAV`.

## Antes de cada commit

1. `node scripts/gerar-html.js` — grava menu, rodapé e publicações nos `.html`
   (necessário para os buscadores lerem links e publicações sem JavaScript).
2. Se alterou CSS ou JS, atualize a versão `?v=AAAAMMDDhhmm` (horário de Brasília) em todas
   as páginas, como faz `scripts/versao.ps1`. Sem PowerShell, use:
   `V=$(TZ=America/Recife date +%Y%m%d%H%M); sed -i -E "s#(assets/(css|js)/[A-Za-z0-9_-]+\.(css|js))(\?v=[0-9]+)?#\1?v=$V#g" *.html`
3. Atualize `<lastmod>` em `sitemap.xml` das páginas alteradas.
4. Teste no Chromium (Playwright) com `python3 -m http.server`: sem erros no console,
   menu com 9 links, 35+ publicações em `publicacoes.html`, troca de idioma funcionando.

## Publicação

- Trabalhe no branch indicado pela sessão. Envie para `main` (o que publica o site) somente
  com autorização do usuário em cada caso; quando autorizado, faça merge direto, sem pull request.
- Após o push em `main`, confira a execução *pages build and deployment* no GitHub Actions
  e teste o site publicado (a rede do ambiente permite acessar `github.io`).

## Buscadores

- Propriedade no Google Search Console: prefixo `https://prof-rafaelbarros.github.io/site/`,
  verificada pela meta tag `google-site-verification` em `index.html` (não remover).
- Não existe `robots.txt` (seria preciso um repositório `prof-rafaelbarros.github.io`); o 404
  equivale a "sem restrições" para o Google e não precisa de correção.
- Melhorias sugeridas e ainda não feitas: mais texto na página inicial; uma URL por idioma
  (`/en/`, `/es/`) com `hreflang`. Só implemente com aprovação do usuário.
