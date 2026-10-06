@echo off
title Eco-Explorer Standalone
echo ========================================================
echo   ECO-EXPLORER: PENJAGA KESEIMBANGAN EKOSISTEM
echo   Server Lokal Standalone IFP (Zero Origin Error)
echo ========================================================
echo.
echo Membuka browser ke http://localhost:8080/ ...
start "" "http://localhost:8080/"
echo.
echo Server berjalan di port 8080.
echo Tekan Ctrl + C untuk menghentikan server jika sudah selesai.
echo.
python -m http.server 8080
