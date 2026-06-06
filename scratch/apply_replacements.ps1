$pyPath = "scratch/apply_theme.py"
$pyContent = [System.IO.File]::ReadAllText($pyPath, [System.Text.Encoding]::UTF8)

$parts = $pyContent -split '"""'

$appPath = "src/App.jsx"
$appContent = [System.IO.File]::ReadAllText($appPath, [System.Text.Encoding]::UTF8)

# Normalize line endings to LF (`n) for matching
$appContentNorm = $appContent.Replace("`r`n", "`n")

for ($i = 0; $i -lt 23; $i++) {
    $target = $parts[4 * $i + 1].Replace("`r`n", "`n")
    $replacement = $parts[4 * $i + 3].Replace("`r`n", "`n")
    
    # Split target into non-empty trimmed lines, escape them, and construct regex
    $targetLines = $target -split "`n" | Where-Object { $_.Trim().Length -gt 0 }
    $escapedLines = $targetLines | ForEach-Object { [regex]::Escape($_.Trim()) }
    $pattern = "(?s)" + ($escapedLines -join "\s+")
    
    # Find match
    $matches = [regex]::Matches($appContentNorm, $pattern)
    if ($matches.Count -ne 1) {
        Write-Host "ERROR: Target $($i+1) matched $($matches.Count) times instead of 1!" -ForegroundColor Red
        Write-Host "Snippet of target:" -ForegroundColor Yellow
        Write-Host ($targetLines[0..2] -join "`n") -ForegroundColor Yellow
        exit 1
    }
    
    # Replace the matched text in $appContentNorm
    $matchedText = $matches[0].Value
    $appContentNorm = $appContentNorm.Replace($matchedText, $replacement)
    Write-Host "SUCCESS: Applied replacement $($i+1)" -ForegroundColor Green
}

# Write modified content back to src/App.jsx as UTF-8
[System.IO.File]::WriteAllText($appPath, $appContentNorm, [System.Text.Encoding]::UTF8)
Write-Host "ALL REPLACEMENTS APPLIED AND SAVED SUCCESSFULLY!" -ForegroundColor Green
