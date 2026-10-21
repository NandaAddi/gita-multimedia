import React, { useState, useEffect, useRef } from 'react';
import Icon from '../common/Icons';
import Modal from '../common/Modal';
import FullscreenButton from '../common/FullscreenButton';
import { useQuiz } from '../../context/QuizContext';
import { topicOf, TOPICS } from '../../data/questions';

export default function QuizScreen() {
  const {
    deck,
    currentIndex,
    combo,
    picked,
    isLocked,
    feedback,
    pickOption,
    checkAnswer,
    nextQuestion,
    setScreen
  } = useQuiz();

  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  const lastEnterTimeRef = useRef(0);

  const currentQ = deck[currentIndex];
  const progressRatio = deck.length > 0 ? (currentIndex + 1) / deck.length : 0;
  const topicIndex = topicOf(currentIndex);

  // Keyboard shortcut listener (1-4 and Enter) with anti-spam debounce
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return; // Mencegah held-key spam
      if (e.key >= '1' && e.key <= '4') {
        const optionIndex = Number(e.key) - 1;
        if (currentQ && optionIndex < currentQ.opts.length && !isLocked) {
          pickOption(optionIndex);
        }
      } else if (e.key === 'Enter') {
        const now = Date.now();
        if (now - lastEnterTimeRef.current < 250) return; // Debounce 250ms
        lastEnterTimeRef.current = now;

        if (!isLocked && picked !== null) {
          checkAnswer();
        } else if (isLocked) {
          nextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, isLocked, picked, checkAnswer, nextQuestion, pickOption]);

  if (!currentQ) return null;

  return (
    <section className="screen active quiz-screen-container">
      {/* Header Sticky */}
      <header className="q-header">
        <button
          className="icon-btn"
          onClick={() => setIsQuitModalOpen(true)}
          aria-label="Keluar Kuis"
        >
          <Icon name="cross" size={24} />
        </button>

        <div className="progress">
          <div
            className="progress-fill"
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>

        {combo >= 3 && (
          <div className="combo pop">
            <Icon name="flame" size={15} />
            <b>x{combo}</b>
          </div>
        )}

        <FullscreenButton size={22} />
      </header>

      {/* Main Soal & Opsi */}
      <main className="q-main" key={currentIndex}>
        <div className="q-meta">
          <span className="num">
            POSTTEST · SOAL {currentIndex + 1} DARI {deck.length}
          </span>
          <span className={`topic t${topicIndex}`}>{TOPICS[topicIndex]}</span>
        </div>

        <h2 className="q-text">{currentQ.q}</h2>

        <div className="opts">
          {currentQ.opts.map((optText, i) => {
            let stateClass = '';
            if (isLocked) {
              if (i === currentQ.a) {
                stateClass = 'right';
              } else if (i === picked) {
                stateClass = 'wrongpick';
              } else {
                stateClass = 'dim';
              }
            } else if (i === picked) {
              stateClass = 'selected';
            }

            return (
              <button
                key={i}
                className={`opt ${isLocked ? 'locked' : ''} ${stateClass}`}
                onClick={() => pickOption(i)}
                disabled={isLocked}
              >
                <span className="key">{i + 1}</span>
                <span className="txt">{optText}</span>
                <span className="mark">
                  {i === currentQ.a ? (
                    <Icon name="check" size={20} />
                  ) : i === picked ? (
                    <Icon name="cross" size={20} />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      {/* Sheet Bawah Periksa / Lanjutkan */}
      <footer
        className={`q-footer ${
          feedback ? (feedback.ok ? 'good' : 'bad') : ''
        }`}
      >
        <div className="q-footer-inner">
          {feedback && (
            <div className="fb">
              <div className="fic">
                <Icon name={feedback.ok ? 'check' : 'cross'} size={20} />
              </div>
              <div>
                <div className="fb-title">{feedback.title}</div>
                <div className="fb-body">
                  {feedback.body}
                  {feedback.why && <div className="fb-why">{feedback.why}</div>}
                </div>
              </div>
            </div>
          )}

          {!isLocked ? (
            <button
              className="btn btn-primary btn-main"
              disabled={picked === null}
              onClick={checkAnswer}
            >
              PERIKSA
            </button>
          ) : (
            <button
              className={`btn btn-main ${
                feedback && feedback.ok ? 'btn-white-g' : 'btn-white-r'
              }`}
              onClick={nextQuestion}
            >
              LANJUTKAN
            </button>
          )}
        </div>
      </footer>

      {/* Modal Keluar Kuis */}
      <Modal
        isOpen={isQuitModalOpen}
        onClose={() => setIsQuitModalOpen(false)}
        icon="cross"
        tint="red"
        title="Keluar dari kuis?"
        text="Progres kuis ini akan hilang, lho. Masih mau lanjut belajar?"
        actions={[
          {
            label: 'LANJUT BELAJAR',
            kind: 'primary',
            onClick: () => setIsQuitModalOpen(false)
          },
          {
            label: 'KELUAR',
            kind: 'ghost',
            onClick: () => {
              setIsQuitModalOpen(false);
              setScreen('home');
            }
          }
        ]}
      />


    </section>
  );
}
