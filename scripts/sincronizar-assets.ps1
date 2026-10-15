# Copia as versões WEB dos assets (Documents\REZZU\SITE\ASSETS) para src\assets do site.
# Os masters/PSDs ficam fora do repositório. Rode depois de SITE\scripts\regerar_tudo.ps1.
# Uso: .\scripts\sincronizar-assets.ps1        (da raiz do projeto)
$ErrorActionPreference = "Stop"
$origem = "C:\Users\windows\Documents\REZZU\SITE\ASSETS"
$destino = Join-Path $PSScriptRoot "..\src\assets"

# destino relativo em src\assets  <=  arquivo de origem em ASSETS
$mapa = [ordered]@{
    "marca\z-mono-lima.svg"                  = "z\svg\z-mono-lima.svg"
    "marca\z-animavel.svg"                   = "z\svg\z-animavel.svg"
    "hero\horizonte.webp"                    = "secoes\01-hero-horizonte.webp"
    "hero\z3d-fechado.png"                   = "z\render\z3d-fechado-isolado.png"
    "hero\z3d-meio.png"                      = "z\render\z3d-meio-isolado.png"
    "hero\z3d-aberto.png"                    = "z\render\z3d-aberto-isolado.png"
    "resultados\crescimento.webp"            = "secoes\02-resultados-crescimento.webp"
    "metodo\degraus-base.png"                = "secoes\metodo\animacao\00-degraus-base.png"
    "metodo\degrau-1.png"                    = "secoes\metodo\animacao\01-degrau-aceso.png"
    "metodo\degrau-2.png"                    = "secoes\metodo\animacao\02-degrau-aceso.png"
    "metodo\degrau-3.png"                    = "secoes\metodo\animacao\03-degrau-aceso.png"
    "metodo\degrau-4.png"                    = "secoes\metodo\animacao\04-degrau-aceso.png"
    "metodo\degrau-5.png"                    = "secoes\metodo\animacao\05-degrau-aceso.png"
    "metodo\bola.png"                        = "secoes\metodo\animacao\bola-sprite.png"
    "metodo\porta.png"                       = "secoes\metodo\animacao\porta-luz.png"
    "metodo\posicoes.json"                   = "secoes\metodo\animacao\posicoes.json"
    "fundadores\fundadores-apontando.webp"   = "fotos\tratadas\fundadores-apontando-recorte.webp"
    "fundadores\fundadores-notebook.webp"    = "fotos\tratadas\fundadores-notebook-recorte.webp"
    "nichos\med.webp"                        = "secoes\06-nicho-med.webp"
    "nichos\food.webp"                       = "secoes\06-nicho-food.webp"
    "nichos\juridico.webp"                   = "secoes\06-nicho-juridico.webp"
    "cta\portal.webp"                        = "secoes\07-cta-portal.webp"
}

$total = 0
foreach ($par in $mapa.GetEnumerator()) {
    $src = Join-Path $origem $par.Value
    $dst = Join-Path $destino $par.Key
    if (-not (Test-Path $src)) { Write-Warning "não encontrado: $($par.Value)"; continue }
    New-Item -ItemType Directory -Force (Split-Path $dst) | Out-Null
    Copy-Item $src $dst -Force
    $kb = [math]::Round((Get-Item $dst).Length / 1KB)
    if ($kb -gt 1024) { Write-Warning "$($par.Key) tem $kb KB (> 1 MB): gere uma versão web menor" }
    $total++
}
Write-Output "ok: $total arquivo(s) sincronizado(s) em src\assets"
