@echo off
title Lebensfunke Heim Egerkingen - StaffHub Public Server
cd /d "%~dp0"

echo ==========================================================
echo  Lebensfunke Heim Egerkingen - StaffHub
echo  Live-Server und oeffentlicher HTTPS-Tunnel
echo ==========================================================
echo.
echo Starte lokalen Python-Server...
start "" /b python server.py

echo Warte 2 Sekunden...
timeout /t 2 /nobreak >nul

echo Starte Cloudflare Tunnel fuer weltweiten Zugriff...
cloudflared.exe tunnel --url http://localhost:8080 --no-autoupdate

pause
