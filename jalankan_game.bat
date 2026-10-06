@echo off
title Eco-Explorer - Server Lokal IFP
echo ========================================================
echo   ECO-EXPLORER: PENJAGA KESEIMBANGAN EKOSISTEM
echo   Server Lokal SDN Percobaan 2 Malang (Zero Origin Error)
echo ========================================================
echo.
echo Membuka browser ke http://localhost:8080/TES GITA BARU 1/ ...
start "" "http://localhost:8080/TES%%20GITA%%20BARU%%201/"
echo.
echo Server berjalan di port 8080.
echo Tekan Ctrl + C untuk menghentikan server jika sudah selesai.
echo.
python -m http.server 8080
