import React, { useState, useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';

export default function StudentIdModal() {
  const { siswa, saveStudent, isIdModalOpen, setIsIdModalOpen } = useStudent();

  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('5A');
  const [absen, setAbsen] = useState('');

  useEffect(() => {
    if (siswa) {
      setNama(siswa.nama || '');
      setKelas(siswa.kelas || '5A');
      setAbsen(siswa.absen || '');
    }
  }, [siswa, isIdModalOpen]);

  useEffect(() => {
    if (isIdModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isIdModalOpen]);

  if (!isIdModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama.trim() || !absen.trim()) return;
    saveStudent({ nama, kelas, absen });
  };

  return (
    <div className="id-overlay">
      <div className="id-card">
        <div className="id-avatar">🦉</div>
        <div className="id-title">Halo, Detektif Ekosistem!</div>
        <div className="id-sub">
          Sebelum kuis dimulai, Oli ingin mengenal kamu.
          <br />
          Isi data dirimu di bawah ini, ya!
        </div>
        <form className="id-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="id-field">
            <label htmlFor="id-nama">NAMA LENGKAP</label>
            <input
              type="text"
              id="id-nama"
              placeholder="Tuliskan namamu di sini..."
              required
              maxLength={60}
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              autoFocus
            />
          </div>
          <div className="id-row">
            <div className="id-field">
              <label htmlFor="id-kelas">KELAS</label>
              <select
                id="id-kelas"
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
            <div className="id-field">
              <label htmlFor="id-absen">NO. ABSEN</label>
              <input
                type="number"
                id="id-absen"
                placeholder="01"
                min="1"
                max="40"
                required
                value={absen}
                onChange={(e) => setAbsen(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary id-submit">
            MULAI KUIS 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
