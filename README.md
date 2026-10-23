# Site do Prof. Rafael Barros

Site estático publicado com GitHub Pages em https://prof-rafaelbarros.github.io/site/

## Estrutura

| Arquivo | Página |
|---|---|
| `index.html` | 1. Página inicial |
| `sobre.html` | 2. Sobre o Professor |
| `ensino.html` | 3. Ensino |
| `pesquisa.html` | 4. Pesquisa |
| `gsel.html` | GSEL – Grupo de Pesquisa em Sistemas Elétricos |
| `orientacoes.html` | 4.1 Orientações |
| `publicacoes.html` | 4.2 Publicações (dados em `assets/js/publicacoes-dados.js`) |
| `projetos.html` | 4.3 Projetos de PD&I |
| `contato.html` | 5. Contato |

- `assets/css/style.css` — identidade visual (cores definidas no início do arquivo).
- `assets/js/site.js` — menu, rodapé e troca de idioma, compartilhados por todas as páginas.

## Idiomas

Português é o padrão. Todo texto aparece três vezes, uma por idioma:

```html
<span data-l="pt">Ensino</span><span data-l="en">Teaching</span><span data-l="es">Docencia</span>
```

Ao editar um texto, altere as três versões. O idioma escolhido fica salvo no navegador
e também pode ser forçado pelo endereço, por exemplo `publicacoes.html?lang=en`.

## Adicionar uma publicação

Inclua um novo bloco em `assets/js/publicacoes-dados.js`, copiando um existente do mesmo tipo
(`book`, `journal` ou `conf`). A capa, se houver, vai em `assets/img/pub/`.

## Publicação no GitHub Pages

Os arquivos desta pasta ficam na raiz do repositório `prof-rafaelbarros/site`.
Em *Settings → Pages*, use *Deploy from a branch*, branch `main`, pasta `/ (root)`.
