@echo off
chcp 65001 >nul
title Nabd - Backend & Frontend

echo ============================================
echo    Starting Nabd (Backend + Frontend)
echo ============================================
echo.

echo [1/2] Starting Backend (Laravel) on port 8000...
start "Nabd Backend" cmd /k "cd /d "%~dp0nabd-backend" && php artisan serve"

timeout /t 2 /nobreak >nul

echo [2/2] Starting Frontend (Vite) on port 3000...
start "Nabd Frontend" cmd /k "cd /d "%~dp0" && npm run dev"

echo.
echo ============================================
echo    Both servers are starting!
echo    Backend:  http://localhost:8000
echo    Frontend: http://localhost:3000
echo ============================================
echo.
echo Press any key to stop both servers...
pause >nul

taskkill /fi "WINDOWTITLE eq Nabd Backend*" /f >nul 2>&1
taskkill /fi "WINDOWTITLE eq Nabd Frontend*" /f >nul 2>&1
