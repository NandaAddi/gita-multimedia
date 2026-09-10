---
description: Memastikan dokumen pendamping skripsi (PRD, LKPD, ROADMAP, SKRIPSI, PROMPT_ASSET) selalu disinkronkan setiap ada penambahan fitur atau prinsip pembelajaran baru pada game Eco-Explorer.
trigger: always_on
---

# SYNC SKRIPSI COMPANION DOCS RULE

Setiap kali terjadi perubahan pada kode game (`WEBSITE/js/phaser-game/scenes/*.js`, `WEBSITE/js/audio.js`, dll.):

1. **Wajib Cek Dokumen Pendamping di folder `docs/`:**
   - Apakah fitur baru mengubah mekanisme gameplay? -> Perbarui `docs/PRD_GAME_SKRIPSI.md`.
   - Apakah prinsip pembelajaran baru ditambahkan (Mayer, Piaget, Vygotsky, CSCL, LM-GM)? -> Catat di `docs/PRD_GAME_SKRIPSI.md` dan `docs/SKRIPSI.md`.
   - Apakah interaksi siswa di kelas atau kartu voting berubah? -> Perbarui `docs/LKPD_DETEKTIF_SAWAH.md`.
   - Apakah ada progres milestone R&D? -> Perbarui `docs/ROADMAP.md`.
   - Apakah ada aset baru yang digenerate? -> Catat promptnya di `docs/PROMPT_ASSET_GEMINI.md`.

2. **Eksekusi:** Selalu perbarui dokumen pendamping tersebut bersamaan dengan pembuatan fitur game, jangan tinggalkan dokumen dalam kondisi usang (*out of date*).
