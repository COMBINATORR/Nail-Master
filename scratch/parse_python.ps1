$pyPath = "scratch/apply_theme.py"
$pyContent = [System.IO.File]::ReadAllText($pyPath, [System.Text.Encoding]::UTF8)

# Split by the triple quotes
$parts = $pyContent -split '"""'
Write-Host "Total parts: $($parts.Count)"

# Let's print the first target and replacement
if ($parts.Count -gt 4) {
    Write-Host "--- Target 1 ---" -ForegroundColor Yellow
    Write-Host $parts[1]
    Write-Host "--- Replacement 1 ---" -ForegroundColor Green
    Write-Host $parts[3]
}
