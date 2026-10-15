import React, { createContext, useContext, useState, useRef } from 'react';
import { QUESTIONS } from '../data/questions';
import { useSound } from './SoundContext';
import { useStudent } from './StudentContext';
import { submitQuizResult } from '../services/supabase';

const QuizContext = createContext();

const PRAISES = ['Bagus sekali!', 'Hebat!', 'Mantap!', 'Keren!', 'Tepat sekali!', 'Kamu jago!'];
const CHEERS = [
  'Konsepnya sudah kamu kuasai!',
  'Terus semangat, ya!',
  'Kamu makin paham ekosistem!',
  'Nilai plus dari Oli!'
];
const OOPSES = ['Belum tepat', 'Hampir benar', 'Coba ingat lagi'];

export function QuizProvider({ children }) {
  const { sfx } = useSound();
  const { siswa, store, updateStore, setDbStatus } = useStudent();

  const [screen, setScreen] = useState(() => {
    return siswa && siswa.nama ? 'home' : 'identity';
  });
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [records, setRecords] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [durationSecs, setDurationSecs] = useState(0);

  // Per-question state & sync lock ref
  const [picked, setPicked] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [feedback, setFeedback] = useState(null); // { ok: bool, title: string, body: string, why?: string }
  const isCheckingRef = useRef(false);

  const buildDeck = () => {
    return QUESTIONS.map((q) => {
      const idx = q.opts.map((_, i) => i);
      for (let i = idx.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idx[i], idx[j]] = [idx[j], idx[i]];
      }
      return {
        q: q.q,
        why: q.why,
        opts: idx.map((i) => q.opts[i]),
        a: idx.indexOf(q.a)
      };
    });
  };

  const startQuiz = () => {
    if (store && store.post !== null) {
      console.warn('Posttest sudah diselesaikan, tidak dapat mengulang.');
      return;
    }
    isCheckingRef.current = false;
    const newDeck = buildDeck();
    setDeck(newDeck);
    setCurrentIndex(0);
    setXp(0);
    setCombo(0);
    setCorrectCount(0);
    setRecords([]);
    setPicked(null);
    setIsLocked(false);
    setFeedback(null);
    setStartTime(Date.now());
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pickOption = (idx) => {
    if (isLocked || isCheckingRef.current) return;
    sfx.tap();
    setPicked(idx);
  };

  const checkAnswer = () => {
    if (picked === null || isLocked || isCheckingRef.current) return;
    isCheckingRef.current = true;
    setIsLocked(true);

    const currentQ = deck[currentIndex];
    const isCorrect = picked === currentQ.a;

    setRecords((prev) => [...prev, { picked, ok: isCorrect }]);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setCombo((prev) => prev + 1);
      setXp((prev) => prev + 10);
      sfx.correct();

      setFeedback({
        ok: true,
        title: PRAISES[Math.floor(Math.random() * PRAISES.length)],
        body: CHEERS[Math.floor(Math.random() * CHEERS.length)]
      });
    } else {
      setCombo(0);
      sfx.wrong();

      setFeedback({
        ok: false,
        title: OOPSES[Math.floor(Math.random() * OOPSES.length)],
        body: `Jawaban benar: ${currentQ.opts[currentQ.a]}`,
        why: currentQ.why
      });
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= deck.length) {
      finishQuiz();
    } else {
      isCheckingRef.current = false;
      setCurrentIndex((prev) => prev + 1);
      setPicked(null);
      setIsLocked(false);
      setFeedback(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const finishQuiz = async () => {
    isCheckingRef.current = false;
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    setDurationSecs(elapsed);
    sfx.finish();

    // Simpan skor terbaik ke store lokal (Math.max)
    const currentBest = store && store.post !== null ? store.post : 0;
    const newBest = Math.max(currentBest, correctCount);
    updateStore({ post: newBest });
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync ke Supabase secara background
    if (siswa && siswa.nama) {
      try {
        setDbStatus('saving');
        await submitQuizResult({
          nama: siswa.nama,
          kelas: siswa.kelas,
          no_absen: siswa.absen,
          jenis_kuis: 'Posttest',
          skor: correctCount,
          total_soal: deck.length,
          akurasi_pct: Math.round((correctCount / deck.length) * 100),
          durasi_detik: elapsed
        });
        setDbStatus('ok');
      } catch (err) {
        console.warn('Gagal sync Supabase:', err);
        setDbStatus('err');
      }
    }
  };

  return (
    <QuizContext.Provider
      value={{
        screen,
        setScreen,
        deck,
        currentIndex,
        xp,
        combo,
        correctCount,
        records,
        durationSecs,
        picked,
        isLocked,
        feedback,
        startQuiz,
        pickOption,
        checkAnswer,
        nextQuestion
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);
