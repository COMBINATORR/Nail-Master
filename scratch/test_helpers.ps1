$filePath = "src/App.jsx"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
$lines = $content -split "`r?`n"
$helperLines = $lines[471..489]
$helperText = $helperLines -join "`n"
Write-Host "Helper text length: $($helperText.Length)"
Write-Host $helperText
