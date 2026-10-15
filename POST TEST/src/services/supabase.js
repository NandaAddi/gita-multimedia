import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON } from '../config/constants';

export const isSupabaseConfigured = () =>
  Boolean(SUPABASE_URL && SUPABASE_ANON && SUPABASE_URL.startsWith('https://'));

export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

export async function submitQuizResult({
  nama,
  kelas,
  no_absen,
  jenis_kuis = 'Posttest',
  skor,
  total_soal,
  akurasi_pct,
  durasi_detik
}) {
  if (!supabase) {
    throw new Error('Supabase belum terkonfigurasi dengan benar.');
  }

  const { data, error } = await supabase
    .from('kuis_siswa')
    .insert([
      {
        nama,
        kelas,
        no_absen: parseInt(no_absen, 10) || 0,
        jenis_kuis,
        skor,
        total_soal,
        akurasi_pct,
        durasi_detik,
        device_ts: new Date().toISOString()
      }
    ]);

  if (error) throw error;
  return data;
}

export async function fetchAllQuizResults() {
  if (!supabase) {
    throw new Error('Supabase belum terkonfigurasi.');
  }

  const { data, error } = await supabase
    .from('kuis_siswa')
    .select('*')
    .order('device_ts', { ascending: false });

  if (error) throw error;
  return data || [];
}
