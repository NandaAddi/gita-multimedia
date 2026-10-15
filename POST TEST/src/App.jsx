import React, { useState } from 'react';
import { useQuiz } from './context/QuizContext';
import IdentityScreen from './components/identity/IdentityScreen';
import HomeScreen from './components/home/HomeScreen';
import QuizScreen from './components/quiz/QuizScreen';
import ResultScreen from './components/result/ResultScreen';
import PinModal from './components/teacher/PinModal';
import TeacherDashboard from './components/teacher/TeacherDashboard';

import './styles/global.css';
import './styles/identity.css';
import './styles/home.css';
import './styles/quiz.css';
import './styles/result.css';
import './styles/dashboard.css';

export default function App() {
  const { screen } = useQuiz();

  const [isPinOpen, setIsPinOpen] = useState(false);
  const [isDashOpen, setIsDashOpen] = useState(false);

  return (
    <div className="app-container">
      {screen === 'identity' && <IdentityScreen />}
      {screen === 'home' && (
        <HomeScreen onOpenTeacherPin={() => setIsPinOpen(true)} />
      )}
      {screen === 'quiz' && <QuizScreen />}
      {screen === 'result' && <ResultScreen />}

      {/* Modal PIN Guru */}
      <PinModal
        isOpen={isPinOpen}
        onClose={() => setIsPinOpen(false)}
        onSuccess={() => setIsDashOpen(true)}
      />

      {/* Panel Guru (Dashboard) */}
      <TeacherDashboard
        isOpen={isDashOpen}
        onClose={() => setIsDashOpen(false)}
      />
    </div>
  );
}
