const { execFileSync } = require('child_process');

const script = `
$sizes = @(16,32,48,128)
Add-Type -AssemblyName System.Drawing
foreach ($size in $sizes) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,5,7,11))), 0, 0, $size, $size)

  $inset = [Math]::Max(1, [int]($size * 0.08))
  $inner = New-Object System.Drawing.Rectangle $inset,$inset,($size - 2*$inset),($size - 2*$inset)
  $panelBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $inner, ([System.Drawing.Color]::FromArgb(255,17,24,39)), ([System.Drawing.Color]::FromArgb(255,5,8,22)), 45
  $g.FillRectangle($panelBrush, $inner)
  $g.DrawRectangle((New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255,34,211,238)), ([Math]::Max(1, [int]($size*0.04)))), $inner)

  $fontSize = [Math]::Max(10, [int]($size * 0.84))
  $font = New-Object System.Drawing.Font 'Arial', $fontSize, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,248,250,252))
  $textRect = New-Object System.Drawing.RectangleF 0,([float]($size*0.03)),$size,([float]($size*0.86))
  $g.DrawString('P', $font, $textBrush, $textRect, $format)

  $playBox = New-Object System.Drawing.Rectangle ([int]($size*0.41)),([int]($size*0.24)),([int]($size*0.30)),([int]($size*0.30))
  $g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,7,17,31))), $playBox)
  $g.DrawEllipse((New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255,34,211,238)), ([Math]::Max(1, [int]($size*0.03)))), $playBox)

  $points = @(
    (New-Object System.Drawing.Point ([int]($size*0.50)), ([int]($size*0.31))),
    (New-Object System.Drawing.Point ([int]($size*0.63)), ([int]($size*0.39))),
    (New-Object System.Drawing.Point ([int]($size*0.50)), ([int]($size*0.47)))
  )
  $playBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $playBox, ([System.Drawing.Color]::FromArgb(255,34,211,238)), ([System.Drawing.Color]::FromArgb(255,244,114,182)), 45
  $g.FillPolygon($playBrush, $points)

  $bmp.Save("icons/icon$size.png", [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  Write-Output "Created icons/icon$size.png"
}
`;

execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', script], {
  cwd: __dirname,
  stdio: 'inherit',
});

console.log('All icons created!');
