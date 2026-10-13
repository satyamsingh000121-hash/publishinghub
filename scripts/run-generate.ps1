$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue
foreach ($p in $nodeProcesses) {
    try {
        $found = $p.Modules | Where-Object { $_.FileName -like "*query_engine*" }
        if ($found) {
            Write-Host "Found locking process: PID $($p.Id)"
            Stop-Process -Id $p.Id -Force
            Write-Host "Stopped PID $($p.Id)"
        }
    } catch {
        # ignore access denied on other system processes
    }
}

Write-Host "Removing tmp files..."
Remove-Item "node_modules\.prisma\client\*.tmp*" -Force -ErrorAction SilentlyContinue

Write-Host "Running prisma generate..."
npx prisma generate
