@echo off
title Push Our Covenant Love to GitHub
echo ============================================================
echo   Mengunggah Perubahan Our Covenant Love ke GitHub...
echo ============================================================
cd /d "%~dp0"
git push origin main
echo.
if %errorlevel% equ 0 (
    echo [BERHASIL] Push ke GitHub selesai!
) else (
    echo [CATATAN] Jika diminta, silakan login ke GitHub akun borismanurung di browser Anda.
)
echo.
pause
