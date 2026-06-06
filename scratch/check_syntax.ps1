$content = [System.IO.File]::ReadAllText("src/App.jsx", [System.Text.Encoding]::UTF8)

# Count curly braces
$openCurlies = ($content.ToCharArray() | Where-Object { $_ -eq '{' }).Count
$closeCurlies = ($content.ToCharArray() | Where-Object { $_ -eq '}' }).Count
Write-Host "Curly Braces: Open=$openCurlies, Close=$closeCurlies"

# Count parentheses
$openParens = ($content.ToCharArray() | Where-Object { $_ -eq '(' }).Count
$closeParens = ($content.ToCharArray() | Where-Object { $_ -eq ')' }).Count
Write-Host "Parentheses: Open=$openParens, Close=$closeParens"

# Count square brackets
$openSquares = ($content.ToCharArray() | Where-Object { $_ -eq '[' }).Count
$closeSquares = ($content.ToCharArray() | Where-Object { $_ -eq ']' }).Count
Write-Host "Square Brackets: Open=$openSquares, Close=$closeSquares"

if ($openCurlies -ne $closeCurlies) {
    Write-Host "ERROR: Mismatched curly braces!" -ForegroundColor Red
}
if ($openParens -ne $closeParens) {
    Write-Host "ERROR: Mismatched parentheses!" -ForegroundColor Red
}
if ($openSquares -ne $closeSquares) {
    Write-Host "ERROR: Mismatched square brackets!" -ForegroundColor Red
}
