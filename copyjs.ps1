#Set-ExecutionPolicy RemoteSigned
Param(
    [Parameter(Mandatory = $false)]
    [ValidateSet('mysql-backup', 'weblized-util')]
    [String]
    $target
)
if (-not $target) {
    return "parameter 'target' is mandatory.";
}
yarn build
$dst = "..\${target}\src\main\resources\cache-forever\freact"
Remove-Item "${dst}\*.*"
$src = ".\build\static\js"
Copy-Item -Path $src -Destination $dst -Recurse -Container: $false
$jsname = Get-ChildItem $src | Where-Object Name -Match '^main\.(.*)\.js$' | Select-Object -First 1 -ExpandProperty Name |
ForEach-Object {$Matches[1]}

$tmpFolder = "..\${target}\src\main\resources\templates"
# Get-ChildItem -Path "${tmpFolder}\*.html" -Recurse | Where-Object {(Get-Content $_) -contains "/freact/" }
$files = Get-ChildItem -Path "${tmpFolder}\*.html" -Recurse | Where-Object  {(Get-Content $_) -match "/freact/main.(.*?).js"}

foreach ($f in $files) {
    (Get-Content -Path $f -Encoding UTF8) -replace '/freact/main\.[a-z0-9]+\.js',"/freact/main.${jsname}.js" | Out-File -FilePath $f -Encoding utf8
    # $f | Get-Content -Encoding UTF8 | ForEach-Object {$_ -replace '/freact/main\.[a-z0-9]+\.js',"/freact/main.${jsname}.js" } | Out-File -FilePath $f -Encoding utf8 |
}

# $line = '<script th:src="@{/cache-forever/freact/main.d99f4a71.js}" src="../cache-forever/freact/main.d99f4a71.js"></script>';
# $line
# $line -replace '/freact/main\.[a-z0-9]+\.js',"/freact/main.${jsname}.js"
# foreach ($f in $files) {
#     $f | Get-Member
# }
# $Matches[1]

# (Get-Content c:\temp\test.txt).replace('[MYID]', 'MyValue') | Set-Content c:\temp\test.txt