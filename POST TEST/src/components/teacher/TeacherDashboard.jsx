import React, { useState, useEffect } from 'react';
import { fetchAllQuizResults } from '../../services/supabase';
import { ANGKET_URL, SHEETS_URL } from '../../config/constants';
import { useStudent } from '../../context/StudentContext';
import FullscreenButton from '../common/FullscreenButton';

export default function TeacherDashboard({ isOpen, onClose }) {
  const { resetStore } = useStudent();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchAllQuizResults();
      setData(results);
    } catch (err) {
      console.warn('Gagal memuat rekap guru:', err);
      setError(err.message || 'Gagal terhubung ke database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;

  // Kalkulasi ringkasan statistik
  const siswaSet = new Set(data.map((r) => r.nama + r.kelas + r.no_absen));
  const posttests = data.filter((r) => r.jenis_kuis === 'Posttest');
  const targetData = posttests.length > 0 ? posttests : data;
  const avg = targetData.length
    ? Math.round(targetData.reduce((s, r) => s + (r.skor || 0), 0) / targetData.length)
    : 0;
  const maxScore = targetData.length
    ? Math.max(...targetData.map((r) => r.skor || 0))
    : 0;
  const tuntasCount = targetData.filter(
    (r) => (r.skor || 0) / (r.total_soal || 20) >= 0.75
  ).length;
  const tuntasPct = targetData.length
    ? Math.round((tuntasCount / targetData.length) * 100)
    : 0;

  const exportCSV = () => {
    if (!data.length) {
      alert('Belum ada data nilai untuk diunduh.');
      return;
    }
    const headers = [
      'Nama',
      'Kelas',
      'No Absen',
      'Jenis Kuis',
      'Skor',
      'Total Soal',
      'Akurasi (%)',
      'Durasi (detik)',
      'Waktu'
    ];
    const rows = data.map((r) =>
      [
        `"${r.nama}"`,
        r.kelas,
        r.no_absen,
        r.jenis_kuis,
        r.skor,
        r.total_soal,
        r.akurasi_pct,
        r.durasi_detik,
        `"${new Date(r.device_ts).toLocaleString('id-ID')}"`
      ].join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rekap_nilai_ekosistem_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="dash-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dash-card">
        <div className="dash-head">
          <div>
            <h2>📊 Panel Guru — Rekap Nilai</h2>
            <p>
              {loading
                ? 'Memuat data dari cloud...'
                : error
                ? `Terjadi kendala: ${error}`
                : `Terakhir diperbarui: ${new Date().toLocaleTimeString('id-ID')}`}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FullscreenButton size={20} className="icon-btn" />
            <button className="dash-close" onClick={onClose} aria-label="Tutup Dashboard">
              ✕
            </button>
          </div>
        </div>

        <div className="dash-body">
          {/* Kartu Statistik Ringkas */}
          <div className="dash-summary">
            <div className="dash-stat">
              <div className="dsv">{siswaSet.size}</div>
              <div className="dsl">SISWA</div>
            </div>
            <div className="dash-stat">
              <div className="dsv">{posttests.length}</div>
              <div className="dsl">POSTTEST</div>
            </div>
            <div className="dash-stat">
              <div className="dsv">{avg}/20</div>
              <div className="dsl">RATA SKOR</div>
            </div>
            <div className="dash-stat">
              <div className="dsv">{maxScore}/20</div>
              <div className="dsl">TERTINGGI</div>
            </div>
            <div className="dash-stat">
              <div className="dsv">{tuntasPct}%</div>
              <div className="dsl">TUNTAS (≥75%)</div>
            </div>
          </div>

          {/* Toolbar Aksi Guru */}
          <div className="dash-toolbar">
            <button className="btn btn-teal" onClick={exportCSV}>
              ⬇ Unduh CSV
            </button>
            <button
              className="btn btn-ghost"
              style={{ color: '#0369a1', background: '#E0F2FE' }}
              onClick={() => window.open(ANGKET_URL, '_blank')}
            >
              📝 Buka Angket (Google Form)
            </button>
            <button
              className="btn btn-ghost"
              style={{ color: 'var(--green-dark)' }}
              onClick={() => {
                if (SHEETS_URL) {
                  window.open(SHEETS_URL, '_blank');
                } else {
                  alert(
                    'URL Google Sheets belum dikonfigurasi.\nIsi VITE_SHEETS_URL di file .env atau constants.js.'
                  );
                }
              }}
            >
              📤 Buka Google Sheets
            </button>
            <button className="btn btn-ghost" onClick={loadData} disabled={loading}>
              🔄 {loading ? 'Memuat...' : 'Perbarui'}
            </button>
            <button
              className="btn btn-ghost"
              style={{ color: '#DC2626', background: '#FEF2F2', marginLeft: 'auto' }}
              onClick={() => {
                if (window.confirm('Hapus skor posttest & status angket pada perangkat ini? Hanya lakukan ini jika perlu me-reset perangkat untuk siswa baru.')) {
                  resetStore();
                  alert('Data evaluasi pada perangkat ini berhasil di-reset.');
                }
              }}
            >
              🗑️ Reset Perangkat Ini
            </button>
          </div>

          {/* Tabel Nilai Siswa */}
          <div className="dash-table-wrap">
            <table className="dash-tbl">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NAMA</th>
                  <th>KELAS</th>
                  <th>ABSEN</th>
                  <th>JENIS</th>
                  <th>SKOR</th>
                  <th>AKURASI</th>
                  <th>WAKTU</th>
                  <th>TANGGAL</th>
                </tr>
              </thead>
              <tbody>
                {data.map((r, i) => {
                  const dt = new Date(r.device_ts).toLocaleString('id-ID', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  });
                  const mn = Math.floor((r.durasi_detik || 0) / 60);
                  const sc = (r.durasi_detik || 0) % 60;
                  const isPost = r.jenis_kuis === 'Posttest';

                  return (
                    <tr key={r.id || i}>
                      <td>{i + 1}</td>
                      <td>{r.nama}</td>
                      <td>{r.kelas}</td>
                      <td>{r.no_absen}</td>
                      <td>
                        <span className={isPost ? 'badge-post' : 'badge-pre'}>
                          {isPost ? 'POST' : 'PRE'}
                        </span>
                      </td>
                      <td>
                        <b>
                          {r.skor}/{r.total_soal}
                        </b>
                      </td>
                      <td>{r.akurasi_pct}%</td>
                      <td>
                        {mn}:{String(sc).padStart(2, '0')}
                      </td>
                      <td>{dt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!loading && data.length === 0 && (
              <div className="dash-empty">Belum ada data nilai tersimpan di database.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
