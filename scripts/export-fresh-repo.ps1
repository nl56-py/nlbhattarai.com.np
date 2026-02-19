param(
  [Parameter(Mandatory = $true)]
  [string]$DestinationPath
)

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourcePath = Resolve-Path (Join-Path $scriptRoot "..")
$destPath = Resolve-Path $DestinationPath -ErrorAction SilentlyContinue

if (-not $destPath) {
  New-Item -ItemType Directory -Path $DestinationPath -Force | Out-Null
  $destPath = Resolve-Path $DestinationPath
}

Write-Host "Exporting project from '$sourcePath' to '$destPath'..."

robocopy `
  $sourcePath `
  $destPath `
  /E `
  /XD ".git" "node_modules" "dist" "dist-ssr" ".lovable" `
  /XF ".env"

if ($LASTEXITCODE -gt 7) {
  throw "robocopy failed with exit code $LASTEXITCODE"
}

Write-Host "Export complete."
Write-Host "Next steps:"
Write-Host "  cd $destPath"
Write-Host "  git init"
Write-Host "  git add ."
Write-Host "  git commit -m 'Initial commit'"
