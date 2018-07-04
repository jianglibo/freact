$dst = "..\mysql-backup\src\main\resources\cache-forever\freact"
Remove-Item "${dst}\*.*"
Copy-Item -Path .\build\static\js -Destination $dst -Recurse -Container: $false