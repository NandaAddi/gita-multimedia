import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Mascot from '../common/Mascot';
import { useStudent } from '../../context/StudentContext';
import { useQuiz } from '../../context/QuizContext';

export default function IdentityScreen() {
  const { siswa, saveStudent } = useStudent();
  const { setScreen } = useQuiz();

  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('5A');
  const [absen, setAbsen] = useState('');

  const isEditing = Boolean(siswa && siswa.nama);

  useEffect(() => {
    if (siswa && siswa.nama) {
      setNama(siswa.nama);
      setKelas(siswa.kelas || '5A');
      setAbsen(siswa.absen || '');
    }
  }, [siswa]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama.trim() || !absen.trim()) return;
    saveStudent({ nama, kelas, absen });
    setScreen('home');
  };

  return (
    <section className="screen active identity-screen-wrap">
      <div className="identity-inner">
        {/* Header Bersama Tombol Audio */}
        <Header />

        {/* Hero Sapaan Maskot Oli */}
        <div className="identity-hero">
          <div className="identity-mascot">
            <Mascot />
          </div>
          <div className="identity-bubble">
            Halo, Sahabat Alam! Aku <b>Oli</b> 🦉. Sebelum petualangan kuis dimulai, tuliskan data dirimu terlebih dahulu ya!
          </div>
        </div>

        {/* Card Formulir Lengkap */}
        <div className="identity-card">
          <div className="identity-title-group">
            <h1 className="identity-title">DATA DIRI PESERTA DIDIK</h1>
            <p className="identity-sub">Ilmu Pengetahuan Alam &amp; Sosial · Kelas V SD</p>
          </div>

          <form className="identity-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="id-field-group">
              <label htmlFor="full-nama">👤 NAMA LENGKAP</label>
              <input
                type="text"
                id="full-nama"
                placeholder="Tuliskan nama lengkapmu di sini..."
                required
                maxLength={60}
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                autoFocus
              />
            </div>

            <div className="identity-grid-2">
              <div className="id-field-group">
                <label htmlFor="full-kelas">🏫 KELAS</label>
                <select
                  id="full-kelas"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  required
                >
                  <option value="5A">5A</option>
                  <option value="5B">5B</option>
                  <option value="5C">5C</option>
                  <option value="5D">5D</option>
                  <option value="5E">5E</option>
                </select>
              </div>

              <div className="id-field-group">
                <label htmlFor="full-absen">🔢 NO. ABSEN</label>
                <input
                  type="number"
                  id="full-absen"
                  placeholder="01"
                  min="1"
                  max="40"
                  required
                  value={absen}
                  onChange={(e) => setAbsen(e.target.value)}
                />
              </div>
            </div>

            <div className="identity-actions">
              <button type="submit" className="btn btn-primary btn-submit-identity">
                {isEditing ? 'SIMPAN PERUBAHAN 💾' : 'SIMPAN & LANJUTKAN ➜'}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="btn btn-ghost btn-cancel-identity"
                  onClick={() => setScreen('home')}
                >
                  ⬅️ Kembali ke Beranda
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
