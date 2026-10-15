import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SoundProvider } from './context/SoundContext';
import { StudentProvider } from './context/StudentContext';
import { QuizProvider } from './context/QuizContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoundProvider>
      <StudentProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </StudentProvider>
    </SoundProvider>
  </React.StrictMode>
);
