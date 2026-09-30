$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\www')).Path
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://+:4173/')
$listener.Start()
Write-Host "E-BIBLIA disponible sur http://localhost:4173/"
Write-Host "Racine: $root"
$mime = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='application/javascript; charset=utf-8';
  '.json'='application/json; charset=utf-8'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg';
  '.svg'='image/svg+xml'; '.ico'='image/x-icon'; '.webp'='image/webp'
}
try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    try {
      $relative = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
      if ([string]::IsNullOrWhiteSpace($relative)) { $relative = 'index.html' }
      $full = [IO.Path]::GetFullPath((Join-Path $root $relative))
      if (-not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $full -PathType Leaf)) {
        $context.Response.StatusCode = 404
        $bytes = [Text.Encoding]::UTF8.GetBytes('Not found')
      } else {
        $bytes = [IO.File]::ReadAllBytes($full)
        $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
        $context.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
        $context.Response.StatusCode = 200
      }
      $context.Response.ContentLength64 = $bytes.Length
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } catch {
      $context.Response.StatusCode = 500
    } finally {
      $context.Response.Close()
    }
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
