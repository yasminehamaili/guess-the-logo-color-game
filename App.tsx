
import React, { useState, useEffect, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import GameSection from './components/GameSection';
import ResultSection from './components/ResultSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { GameState } from './types';
import type { LogoData } from './types';
import { LOGO_DATA } from './constants';

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [questions, setQuestions] = useState<LogoData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(shuffleArray(LOGO_DATA));
  }, []);

  const handleStartGame = useCallback(() => {
    setQuestions(shuffleArray(LOGO_DATA));
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState(GameState.Playing);
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setGameState(GameState.Finished);
    }
  }, [currentQuestionIndex, questions.length]);
  
  const handlePlayAgain = useCallback(() => {
    setGameState(GameState.Start);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return (
          <GameSection
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        );
      case GameState.Finished:
        return (
          <ResultSection
            score={score}
            totalQuestions={questions.length}
            onRestart={handlePlayAgain}
          />
        );
      case GameState.Start:
      default:
        return <HeroSection onStart={handleStartGame} />;
    }
  };

  return (
    <main className="relative min-h-screen text-[#222222] antialiased px-4">
      <CustomCursor />
      <div className="relative z-10">{renderContent()}</div>
      {gameState === GameState.Start && <Footer />}
    </main>
  );
};

export default App;
