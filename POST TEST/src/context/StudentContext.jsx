import React, { createContext, useContext, useState, useEffect } from 'react';
import { ID_KEY, STORE_KEY } from '../config/constants';
import { isSupabaseConfigured } from '../services/supabase';

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [siswa, setSiswa] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem(ID_KEY));
      if (s && s.nama) return s;
    } catch (e) {
      console.warn(e);
    }
    return null;
  });

  const [store, setStore] = useState(() => {
    try {
      return Object.assign(
        { post: null, angket: false },
        JSON.parse(localStorage.getItem(STORE_KEY) || '{}')
      );
    } catch {
      return { post: null, angket: false };
    }
  });

  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState(() => (isSupabaseConfigured() ? 'ok' : 'off'));

  useEffect(() => {
    if (!siswa) {
      const timer = setTimeout(() => setIsIdModalOpen(true), 300);
      return () => clearTimeout(timer);
    }
  }, [siswa]);

  const saveStudent = (info) => {
    const formatted = {
      nama: info.nama.trim(),
      kelas: info.kelas || '5A',
      absen: String(info.absen).trim()
    };
    setSiswa(formatted);
    try {
      localStorage.setItem(ID_KEY, JSON.stringify(formatted));
    } catch (e) {
      console.warn(e);
    }
    setIsIdModalOpen(false);
  };

  const updateStore = (updates) => {
    setStore((prev) => {
      const next = { ...prev, ...updates };
      try {
        const full = Object.assign(
          JSON.parse(localStorage.getItem(STORE_KEY) || '{}'),
          next
        );
        localStorage.setItem(STORE_KEY, JSON.stringify(full));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const resetStore = () => {
    const fresh = { post: null, angket: false };
    setStore((prev) => ({ ...prev, ...fresh }));
    try {
      const curr = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      curr.post = null;
      curr.angket = false;
      localStorage.setItem(STORE_KEY, JSON.stringify(curr));
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        siswa,
        saveStudent,
        store,
        updateStore,
        resetStore,
        isIdModalOpen,
        setIsIdModalOpen,
        dbStatus,
        setDbStatus
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export const useStudent = () => useContext(StudentContext);
