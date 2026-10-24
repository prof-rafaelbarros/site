# Site do Prof. Rafael Barros

Site pessoal do Prof. Dr. Rafael Mendonça Rocha Barros, professor de Engenharia Elétrica do
IFPE campus Garanhuns e líder do Grupo de Pesquisa em Sistemas Elétricos (GSEL).

**Endereço:** https://prof-rafaelbarros.github.io/site/

Site estático (HTML, CSS e JavaScript puros, sem etapa de build), publicado pelo GitHub Pages
a partir da raiz do branch `main`.

## Páginas

| Arquivo | Página | Conteúdo |
|---|---|---|
| `index.html` | Início | Boas-vindas, apresentação e carrossel de fotos |
| `sobre.html` | Sobre o Professor | Minicurrículo e perfis nas bases bibliográficas |
| `ensino.html` | Ensino | Disciplinas (Google Classroom) e agendamento de atendimento |
| `pesquisa.html` | Pesquisa | Acesso a GSEL, Publicações e Produtos Tecnológicos |
| `gsel.html` | Pesquisa › GSEL | Grupo de pesquisa e link para o site oficial |
| `publicacoes.html` | Pesquisa › Publicações | Livros, revistas e congressos, com filtro e busca |
| `produtos.html` | Pesquisa › Produtos Tecnológicos | Programas de computador e patentes, com filtro e busca |
| `orientacoes.html` | Orientações | Templates, tutoriais, congressos, periódicos e eventos |
| `contato.html` | Contato | Telefone, e-mail, endereço e mapa do LabSEL |

## Estrutura

```
assets/
  css/style.css               identidade visual (cores e fontes no início do arquivo)
  js/site.js                  menu, rodapé, idiomas, carrossel e pop-up de agendamento
  js/publicacoes-dados.js     lista de publicações
  js/publicacoes.js           montagem, filtro e busca das publicações
  js/produtos.js              filtro e busca dos produtos tecnológicos
  img/                        fotos, capas, imagens dos produtos e logotipos
                                (rb/: logo do professor; gsel/: logo do GSEL;
                                 bases/: ícones das bases bibliográficas)
  docs/                       arquivos para download da página Orientações
scripts/versao.ps1            atualiza a versão de CSS/JS antes de publicar
```

O menu e o rodapé são gerados por `assets/js/site.js`; para alterá-los, edite esse arquivo
(não é preciso mexer em cada página).

## Idiomas

Português é o padrão; inglês e espanhol são escolhidos pelas bandeiras no topo. Todo texto
aparece três vezes, uma por idioma:

```html
<span data-l="pt">Ensino</span><span data-l="en">Teaching</span><span data-l="es">Docencia</span>
```

Ao editar um texto, altere as três versões. O idioma escolhido fica salvo no navegador e
também pode ser forçado pelo endereço, por exemplo `publicacoes.html?lang=en`.

## Tarefas comuns

**Adicionar uma publicação** — inclua um bloco em `assets/js/publicacoes-dados.js`, copiando
um existente do mesmo tipo (`book`, `journal` ou `conf`). A capa, se houver, vai em
`assets/img/pub/`. Congressos sem capa exibem a sigla e o ano; a sigla é definida na lista
`EVENTS` de `assets/js/publicacoes.js`.

**Adicionar um produto tecnológico** — copie um bloco `<article class="product">` em
`produtos.html` e ajuste:
- `data-type`: `patent` (patente) ou `software` (programa de computador);
- a imagem em `assets/img/produtos/` (proporção 16:9; use a classe `top` na imagem para
  alinhar capturas de tela pelo topo e `light` no contêiner para fundo branco);
- a situação: `<span class="avail">` (disponível para licenciamento ou cessão) ou
  `<span class="inuse">` (em uso pelo titular);
- o resumo e as funcionalidades, dentro do bloco recolhível `<details class="psummary">`;
- o número de registro e a data no INPI (`<dl class="pmeta">`);
- os contadores dos botões de filtro no topo da página.

**Atualizar as métricas dos perfis** — os valores de índice h, citações, publicações,
trabalhos e livros são fixos na seção "Perfis em bases bibliográficas" de `sobre.html`
(números dentro de `<b>` em cada `<span class="mstats">`). Atualize-os diretamente no arquivo.

**Adicionar um arquivo em Orientações** — coloque o arquivo em `assets/docs/` e crie o link com
o atributo `download`, que define o nome do arquivo baixado:

```html
<a class="dl" href="assets/docs/arquivo.docx" download="Nome do Arquivo.docx">...</a>
```

**Botão que abre em pop-up** — links com o atributo `data-popup` abrem dentro de uma janela
sobre a página (usado no agendamento de atendimento).

## Publicação

1. Execute `powershell -File scripts\versao.ps1`. Ele atualiza o número de versão (`?v=...`)
   de CSS e JS em todas as páginas, para que os visitantes recebam o visual novo
   imediatamente, sem precisar limpar o cache do navegador.
2. Envie as alterações para o branch `main`:
   ```
   git add -A
   git commit -m "Descrição da alteração"
   git push
   ```
3. O GitHub Pages publica em cerca de 1 minuto (*Actions › pages-build-deployment*).

Configuração do Pages: *Settings › Pages › Deploy from a branch*, branch `main`, pasta `/ (root)`.

## Buscadores (Google, Bing)

- `sitemap.xml` lista todas as páginas. Ao criar uma página nova, inclua-a no sitemap e
  atualize a data `lastmod` das páginas alteradas.
- Cada página tem no `<head>` a descrição, o endereço canônico e as tags Open Graph/Twitter
  (título, descrição e a imagem `assets/img/og-image.jpg`), usadas nos resultados de busca e
  nas prévias de links em redes sociais e no WhatsApp.
- `index.html` e `sobre.html` têm dados estruturados (`application/ld+json`) que descrevem o
  professor e seus perfis acadêmicos.
- O site está cadastrado no Google Search Console (propriedade de prefixo de URL
  `https://prof-rafaelbarros.github.io/site/`), onde se acompanha a indexação.
