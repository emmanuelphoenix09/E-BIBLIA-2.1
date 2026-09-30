$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\www')).Path
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Any, 4173)
$listener.Start()
Write-Host "E-BIBLIA disponible sur http://localhost:4173/"
Write-Host "Acces reseau: http://192.168.2.112:4173/"
$mime = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='application/javascript; charset=utf-8';
  '.json'='application/json; charset=utf-8'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg';
  '.svg'='image/svg+xml'; '.ico'='image/x-icon'; '.webp'='image/webp'
}
try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $buffer = New-Object byte[] 8192
      $read = $stream.Read($buffer, 0, $buffer.Length)
      if ($read -le 0) { continue }
      $request = [Text.Encoding]::ASCII.GetString($buffer, 0, $read)
      $firstLine = ($request -split "`r?`n")[0]
      $parts = $firstLine -split ' '
      $path = if ($parts.Count -ge 2) { $parts[1].Split('?')[0] } else { '/' }
      $relative = [Uri]::UnescapeDataString($path.TrimStart('/'))
      if ([string]::IsNullOrWhiteSpace($relative)) { $relative = 'index.html' }
      $full = [IO.Path]::GetFullPath((Join-Path $root $relative))
      if (-not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $full -PathType Leaf)) {
        $status = '404 Not Found'; $bytes = [Text.Encoding]::UTF8.GetBytes('Not found'); $type = 'text/plain; charset=utf-8'
      } else {
        $status = '200 OK'; $bytes = [IO.File]::ReadAllBytes($full); $ext = [IO.Path]::GetExtension($full).ToLowerInvariant(); $type = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
      }
      $header = "HTTP/1.1 $status`r`nContent-Type: $type`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`nAccess-Control-Allow-Origin: *`r`n`r`n"
      $headBytes = [Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headBytes, 0, $headBytes.Length)
      $stream.Write($bytes, 0, $bytes.Length)
      $stream.Flush()
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
