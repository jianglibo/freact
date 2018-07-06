$dst = "..\mysql-backup\src\main\resources\cache-forever\freact"
Remove-Item "${dst}\*.*"
$src = ".\build\static\js"
Copy-Item -Path $src -Destination $dst -Recurse -Container: $false
Get-ChildItem $src

$tmpFolder = "..\mysql-backup\src\main\resources\templates"
# Get-ChildItem -Path "${tmpFolder}\*.html" -Recurse | Where-Object {(Get-Content $_) -contains "/freact/" }
$files = Get-ChildItem -Path "${tmpFolder}\*.html" -Recurse | Where-Object  {(Get-Content $_) -match "/freact/main.(.*).js"}
$files
# foreach ($f in $files) {
#     $f | Get-Member
# }
# $Matches[1]

# (Get-Content c:\temp\test.txt).replace('[MYID]', 'MyValue') | Set-Content c:\temp\test.txt