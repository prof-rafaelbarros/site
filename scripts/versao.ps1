# Atualiza o número de versão de CSS e JS em todas as páginas (?v=AAAAMMDDhhmm),
# para que os navegadores baixem os arquivos novos logo após cada publicação.
# Uso: powershell -File scripts\versao.ps1
$root = Split-Path $PSScriptRoot -Parent
# grava menu, rodapé e publicações no HTML (requer Node.js)
if (Get-Command node -ErrorAction SilentlyContinue) { node (Join-Path $PSScriptRoot "gerar-html.js") }
else { Write-Warning "Node.js nao encontrado: menu, rodape e publicacoes nao foram atualizados no HTML." }
$v = Get-Date -Format "yyyyMMddHHmm"
$enc = New-Object System.Text.UTF8Encoding $false
Get-ChildItem $root -Filter *.html | ForEach-Object {
  $h = [IO.File]::ReadAllText($_.FullName)
  $n = [regex]::Replace($h, '(assets/(?:css|js)/[\w\-]+\.(?:css|js))(\?v=\d+)?', "`$1?v=$v")
  if ($n -ne $h) { [IO.File]::WriteAllText($_.FullName, $n, $enc) }
}
"versao $v"
