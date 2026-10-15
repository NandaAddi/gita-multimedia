-- ============================================================
-- SETUP DATABASE KUIS EKOSISTEM — SDN PERCOBAAN 2 MALANG
-- Jalankan di: Supabase Dashboard > SQL Editor > New Query > RUN
-- ============================================================

-- 1. BUAT TABEL
-- ============================================================
CREATE TABLE IF NOT EXISTS kuis_siswa (
  id            BIGSERIAL PRIMARY KEY,
  nama          TEXT        NOT NULL,
  kelas         TEXT        NOT NULL DEFAULT '5A',
  no_absen      INTEGER     NOT NULL DEFAULT 0,
  jenis_kuis    TEXT        NOT NULL CHECK (jenis_kuis IN ('Pretest', 'Posttest')),
  skor          INTEGER     NOT NULL CHECK (skor >= 0),
  total_soal    INTEGER     NOT NULL DEFAULT 20,
  akurasi_pct   INTEGER     NOT NULL CHECK (akurasi_pct BETWEEN 0 AND 100),
  durasi_detik  INTEGER     NOT NULL CHECK (durasi_detik >= 0),
  device_ts     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. INDEX UNTUK PERFORMA QUERY
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_kuis_kelas ON kuis_siswa (kelas);
CREATE INDEX IF NOT EXISTS idx_kuis_nama  ON kuis_siswa (nama);
CREATE INDEX IF NOT EXISTS idx_kuis_jenis ON kuis_siswa (jenis_kuis);
CREATE INDEX IF NOT EXISTS idx_kuis_ts    ON kuis_siswa (device_ts DESC);

-- 3. HAK AKSES PERMISSION (GRANTS)
-- ============================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE kuis_siswa TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================
-- RLS menjaga keamanan tabel:
-- - Siswa (anon) HANYA diizinkan INSERT (kirim nilai) dan SELECT (baca rekap).
-- - Tidak ada yang bisa UPDATE atau DELETE data nilai siswa.
ALTER TABLE kuis_siswa ENABLE ROW LEVEL SECURITY;

-- Bersihkan policy lama jika ada
DROP POLICY IF EXISTS "Siswa bisa simpan hasil"    ON kuis_siswa;
DROP POLICY IF EXISTS "Guru bisa baca semua hasil" ON kuis_siswa;
DROP POLICY IF EXISTS "Baca semua hasil"           ON kuis_siswa;
DROP POLICY IF EXISTS "Public insert kuis_siswa"   ON kuis_siswa;
DROP POLICY IF EXISTS "Public select kuis_siswa"   ON kuis_siswa;

-- Policy 1: Siswa (anon) diizinkan menyimpan hasil kuis (INSERT)
CREATE POLICY "Public insert kuis_siswa"
  ON kuis_siswa
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy 2: Guru / Siswa diizinkan membaca hasil kuis untuk rekap (SELECT)
CREATE POLICY "Public select kuis_siswa"
  ON kuis_siswa
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. KONFIRMASI STATUS
-- ============================================================
SELECT 'Setup berhasil! Tabel kuis_siswa dan kebijakan RLS siap digunakan 100%.' AS status;
