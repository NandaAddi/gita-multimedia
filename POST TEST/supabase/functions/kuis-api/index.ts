// =============================================================
// SUPABASE EDGE FUNCTION: kuis-api
// File: supabase/functions/kuis-api/index.ts
//
// Cara deploy:
//   supabase functions deploy kuis-api
//
// Credential TIDAK ada di frontend — semuanya ada di sini,
// di sisi server (Deno runtime Supabase).
// =============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── KONFIGURASI SERVER-SIDE (tidak terekspos ke browser) ────
// Supabase menyuntikkan variabel ini otomatis — kamu TIDAK perlu isi manual.
const SUPABASE_URL     = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// PIN guru disimpan sebagai Supabase Secret (bukan hardcode)
// Set via: supabase secrets set TEACHER_PIN=angka_pin_mu
const TEACHER_PIN      = Deno.env.get("TEACHER_PIN") ?? "1234";

// ─── CORS Headers ─────────────────────────────────────────────
const CORS = {
  "Access-Control-Allow-Origin":  "*",     // ganti dengan domain spesifik di produksi
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ─── Supabase Admin Client (service_role) ─────────────────────
// service_role melewati semua RLS — aman karena hanya dijalankan di server
const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE);

// ─── MAIN HANDLER ─────────────────────────────────────────────
Deno.serve(async (req) => {
  // Handle preflight CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const action = body.action as string;

  // ── ACTION: submit ── simpan hasil kuis siswa ────────────────
  if (action === "submit") {
    const { nama, kelas, no_absen, jenis_kuis, skor, total_soal, akurasi_pct, durasi_detik, device_ts } = body as Record<string, unknown>;

    // Validasi input dasar
    if (!nama || !kelas || !jenis_kuis || skor === undefined) {
      return json({ error: "Data tidak lengkap" }, 400);
    }

    const { error } = await admin.from("kuis_siswa").insert({
      nama:         String(nama).substring(0, 60),
      kelas:        String(kelas),
      no_absen:     Number(no_absen) || 0,
      jenis_kuis:   String(jenis_kuis),
      skor:         Number(skor),
      total_soal:   Number(total_soal) || 20,
      akurasi_pct:  Number(akurasi_pct) || 0,
      durasi_detik: Number(durasi_detik) || 0,
      device_ts:    device_ts ? String(device_ts) : new Date().toISOString(),
    });

    if (error) {
      console.error("Insert error:", error);
      return json({ error: "Gagal menyimpan data" }, 500);
    }

    return json({ ok: true, message: "Nilai berhasil disimpan" });
  }

  // ── ACTION: get_results ── ambil semua hasil (PIN diperlukan) ─
  if (action === "get_results") {
    const { pin } = body as Record<string, unknown>;

    if (String(pin) !== TEACHER_PIN) {
      return json({ error: "PIN salah" }, 403);
    }

    const { data, error } = await admin
      .from("kuis_siswa")
      .select("*")
      .order("device_ts", { ascending: false })
      .limit(500);

    if (error) {
      console.error("Select error:", error);
      return json({ error: "Gagal memuat data" }, 500);
    }

    return json({ ok: true, data });
  }

  return json({ error: "Action tidak dikenal" }, 400);
});

// ─── HELPER ───────────────────────────────────────────────────
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}
