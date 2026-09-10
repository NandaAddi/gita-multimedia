# ATURAN PENGEMBANGAN PROYEK SKRIPSI GITO (ECO-EXPLORER)

## 📌 ATURAN WAJIB: SINKRONISASI OTOMATIS DOKUMEN PENDAMPING SKRIPSI

Setiap kali asisten AI (Antigravity Agent) melakukan:
1. **Penambahan fitur game baru** (tombol, modal, alur scene, efek suara, kontrol IFP);
2. **Penerapan atau penambahan prinsip pembelajaran** (Teori Mayer CTML, Piaget Operasional Konkret, Vygotsky Scaffolding/ZPD, CSCL Kolaborasi Kelas, Kerangka LM-GM, Debriefing Alessi & Trollip);
3. **Perubahan/penambahan aset visual atau audio** (sprite, background, prompt generator, audio synthesizer);
4. **Perubahan aturan, durasi, atau tata cara bermain di kelas 5A**;

Maka agen **WAJIB SECARA PROAKTIF MEMPERBARUI DOKUMEN PENDAMPING TERKAIT** sebelum mengakhiri sesi kerja.

---

### 📋 DAFTAR DOKUMEN PENDAMPING & PEMETAAN TARGET PEMBARUAN

| Dokumen | Peran dalam Skripsi | Bagian yang Wajib Diperbarui Jika Ada Perubahan Game |
| :--- | :--- | :--- |
| **`docs/PRD_GAME_SKRIPSI.md`** | Dokumen Desain Produk & Game (PRD & GDD) | • Bagian 1.3 & 2.2: Kerangka LM-GM & Teori Pedagogis.<br>• Bagian 3: Spesifikasi Ergonomi & Mekanika IFP.<br>• Bagian 4 & 5: Core Gameplay Loop, Fitur Interaktif (Tanya Teman, Scaffolding), & Scene Flow.<br>• Bagian 9: Pipeline Aset & Spesifikasi Teknis. |
| **`docs/LKPD_DETEKTIF_SAWAH.md`** | Lembar Kerja Siswa (Buku Catatan Co-Pilot) | • Petunjuk peran Co-Pilot di meja kelas.<br>• Konfigurasi & warna kartu voting fisik (🟢 Hijau, 🟡 Kuning, 🔴 Merah).<br>• Tabel pengamatan & butir soal tantangan refleksi C2. |
| **`docs/ROADMAP.md`** | Roadmap Penelitian R&D 16 Pekan | • Progres mingguan model Alessi & Trollip (Pekan 8–12: Development & Testing).<br>• Catatan implementasi fitur dan kesiapan media versi Alpha/Beta. |
| **`docs/SKRIPSI.md`** | Naskah & Outline Riset Skripsi | • Penjelasan fenomena kesenjangan C1 vs C2.<br>• Pembahasan keselarasan fitur media interaktif dengan karakteristik siswa kelas 5 SDN Percobaan 2 Malang. |
| **`docs/PROMPT_ASSET_GEMINI.md`** | Panduan Prompt & Spesifikasi Aset | • Menambahkan entri prompt dan deskripsi jika ada aset gambar/sprite/ikon baru yang dibuat. |
| **`docs/DOKUMEN_AUDIT_VOICE_OVER.md`** | Audit Voice-Over Studio Gita | • Transkrip naskah 25 rekaman suara panduan audio dan verifikasi durasi. |

---

### 🔄 PROTOKOL EKSEKUSI SINKRONISASI (CHECKLIST AGEN)
Saat mengedit file kode (`WEBSITE/js/phaser-game/scenes/*.js`, `WEBSITE/js/audio.js`, dll.):
1. [ ] **Evaluasi Dampak:** Analisis apakah perubahan memengaruhi alur belajar siswa, tata letak antarmuka, instrumen LKPD, atau deskripsi teknis PRD.
2. [ ] **Update Simultan:** Lakukan pembaruan pada file markdown pendamping di folder `docs/` (`docs/PRD_GAME_SKRIPSI.md`, `docs/LKPD_DETEKTIF_SAWAH.md`, dll.) pada giliran yang sama atau sebelum melaporkan hasil kepada pengguna.
3. [ ] **Transparansi:** Sebutkan secara eksplisit dalam respons dokumen mana saja yang telah ikut disinkronkan.
