with open('docs/PRD_GAME_SKRIPSI.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Locate section 154
target_marker = "- **Full-Screen Stage Showcase / Hero Biome Slider (BiomeSelectScene.js):**"
end_marker = "- **Streamlined Command Header & Centered Health Pod (SimulationScene.js):**"

start_idx = content.find(target_marker)
end_idx = content.find(end_marker)

assert start_idx != -1 and end_idx != -1, f"Indices not found: start={start_idx}, end={end_idx}"

new_text = """- **Master 2-Column Split Hero Stage Showcase (BiomeSelectScene.js):** Mengadopsi arsitektur panggung pahlawan 2-kolom terpisah ($1540 \\times 580$ px) berbingkai enamel zamrud dan lis ganda emas mengkilap untuk meniadakan 100% risiko tumpang tindih teks:
         - **Kolom Kiri (Identitas Bioma & Tombol Aksi):** Menampung Medali Bioma Besar ($\\\\varnothing 100$ px) berlingkaran halo cahaya radial tim, lencana kapsul bintang prestasi (`⭐ 0/6 BINTANG`), nama ekosistem ($32$ px), tagline bioma ($24$ px), kotak deskripsi sains ekologis mandiri ($580 \\times 126$ px, $24$ px dengan *wordWrap* rapi), serta tombol aksi sentuh chunky 3D raksasa ($580 \\times 72$ px, $30$ px, `👉 SELIDIKI EKOSISTEM INI! 🚀`) lengkap dengan gelombang kejut cincin emas (*shockwave ring*).
         - **Kolom Kanan (Jaring Trofik & 2 Kartu Misi Bertumpuk):** Menampung header terpisah `🐾 RANTAI MAKANAN UTAMA:` ($24$ px) di atas deretan pil organisme *single-line sleek* (zero collision dengan nama organisme!), serta 2 kartu misi vertikal yang lega ($750 \\times 135$ px per kartu) dengan judul misi, deskripsi headline, dan status kapsul (`⚡ Siap Diselidiki` / `🔒 Terkunci`) yang memiliki padding internal lega bebas dari pemotongan border bawah.
         - **Bilah Komando Atas Emas-Zamrud Terpadu ($1760 \\times 74$ px):** Lencana tim aktif dengan *secret 5-tap examiner trigger*, nama tim giliran, perolehan bintang global ($0/24$), serta tombol pill seragam (`🔊 Suara`, `👥 Ganti Tim`, `⚙️ Reset Kelas`) berjarak simetris.
         - **Dok 4 Bioma di Bawah Layar ($Y = 925$):** 4 ubin rounded enamel ($340 \\times 86$ px) dengan sorotan emas mengkilap 3.5px pada bioma aktif dan status terkunci/terbuka.
         - **Sistem Navigasi Hibrida:** Tombol panah arkade samping ($84 \\times 120$ px, radius 22px) di $X = 105$ dan $X = 1815$, 4 dok bioma bawah, serta *touch swipe gesture*.
       """

content = content[:start_idx] + new_text + content[end_idx:]

with open('docs/PRD_GAME_SKRIPSI.md', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated PRD_GAME_SKRIPSI.md!")
