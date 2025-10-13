import React, { useEffect, useState } from 'react';

interface ResultSectionProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultSection: React.FC<ResultSectionProps> = ({ score, totalQuestions, onRestart }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
    
  const getResultMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return "Color Master!";
    if (percentage >= 75) return "Design Pro!";
    if (percentage >= 50) return "Good Eye!";
    return "Keep Practicing!";
  };

  return (
    <div className={`w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-screen text-center transition-all duration-700 ease-out p-4 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="w-full p-1 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-3xl shadow-2xl">
        <div className="w-full bg-white rounded-2xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111]" style={{ fontFamily: "'Sora', sans-serif" }}>
            {getResultMessage()}
          </h2>
          <div className="my-8 relative">
            <p className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: "'Sora', sans-serif" }}>
              {score} / {totalQuestions}
            </p>
            <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-48 h-48 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
                <div className="w-48 h-48 bg-pink-200 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <button
              data-cursor-interactive="true"
              onClick={onRestart}
              className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Play Again
            </button>
            <button
              data-cursor-interactive="true"
              onClick={() => navigator.clipboard.writeText(`I scored ${score}/${totalQuestions} in Guess the Logo Color!`)}
              className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-gray-700 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 ease-in-out"
            >
              Share Score
            </button>
          </div>
        </div>
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Created by the AI Design Department – Welcome Day 2025
      </p>
    </div>
  );
};

export default ResultSection;