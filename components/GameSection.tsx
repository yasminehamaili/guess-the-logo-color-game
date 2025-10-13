import React, { useState, useEffect, useMemo } from 'react';
import type { LogoData } from '../types';

interface GameSectionProps {
  question: LogoData;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const GameSection: React.FC<GameSectionProps> = ({ question, onAnswer, onNext, questionNumber, totalQuestions }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  const shuffledOptions = useMemo(() => shuffleArray(question.options), [question]);

  useEffect(() => {
    setSelectedColors([]);
    setIsRevealed(false);
    setWasCorrect(null);
  }, [question]);

  const handleSelect = (option: string) => {
    if (isRevealed) return;

    if (question.correctColors.length === 1) {
      setSelectedColors([option]);
    } else {
      setSelectedColors((prev) =>
        prev.includes(option)
          ? prev.filter((c) => c !== option)
          : [...prev, option]
      );
    }
  };

  const handleSubmit = () => {
    if (isRevealed || selectedColors.length === 0) return;

    const sortedSelected = [...selectedColors].sort();
    const sortedCorrect = [...question.correctColors].sort();

    const isAnswerCorrect =
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((color, index) => color === sortedCorrect[index]);
    
    setWasCorrect(isAnswerCorrect);
    setIsRevealed(true);
    onAnswer(isAnswerCorrect);
  };

  const getFeedbackMessage = () => {
    if (wasCorrect === null) return null;
    if (wasCorrect) {
      return (
        <p className="text-green-600">
          ✅ Correct! You’ve got the eye of a designer.
        </p>
      );
    }
    return (
      <p className="text-red-600">
        ❌ Oops! Not quite. The real colors are revealed.
      </p>
    );
  };
  
  const getButtonClass = (option: string) => {
    const isSelected = selectedColors.includes(option);
    const isCorrect = question.correctColors.includes(option);
    
    let classes = 'h-24 md:h-28 w-full rounded-2xl transition-all duration-300 ease-in-out transform flex items-center justify-center text-white text-4xl relative';

    if (isRevealed) {
      if (isCorrect) {
        classes += ' ring-4 ring-offset-2 ring-green-500';
      } else if (isSelected && !isCorrect) {
        classes += ' ring-4 ring-offset-2 ring-red-500';
      } else {
        classes += ' opacity-50';
      }
    } else {
      if (isSelected) {
        classes += ' ring-4 ring-offset-2 ring-indigo-500';
      } else {
        classes += ' hover:scale-105';
      }
    }
    
    return classes;
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full p-1 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-3xl shadow-2xl transition-all duration-500">
        <div className="w-full bg-white rounded-2xl p-8 text-center">
          <p className="text-right text-sm text-gray-500 mb-6 font-medium">
            Question {questionNumber}/{totalQuestions}
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-[#111111] mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            What color is the {question.name} logo?
          </h2>
          <p className="text-gray-500 mb-6 min-h-[2rem]">
              {question.correctColors.length > 1 ? 'This logo has multiple colors. Select all of them!' : 'Select the correct color.'}
          </p>

          <div className="relative w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center p-4 mb-8">
            <img
              src={question.colorUrl}
              alt={question.name}
              className={`object-contain h-32 w-32 transition-all duration-500 ease-in-out ${!isRevealed ? 'filter grayscale saturate-0' : 'filter-none'}`}
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-400">?</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {shuffledOptions.map((option) => (
              <button
                key={option}
                data-cursor-interactive="true"
                onClick={() => handleSelect(option)}
                disabled={isRevealed}
                className={getButtonClass(option)}
                style={{ backgroundColor: option }}
              >
                  {isRevealed && question.correctColors.includes(option) && '✓'}
                  {isRevealed && selectedColors.includes(option) && !question.correctColors.includes(option) && '×'}
              </button>
            ))}
          </div>

          <div className="h-12 flex items-center justify-center">
            {isRevealed && wasCorrect !== null && (
              <div className="text-lg font-medium animate-fade-in">
                {getFeedbackMessage()}
              </div>
            )}
          </div>
          
          <div className="mt-4 h-16 flex items-center justify-center">
              {isRevealed ? (
                  <button
                      data-cursor-interactive="true"
                      onClick={onNext}
                      className="w-full sm:w-auto px-8 py-3 text-md font-medium text-white bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl hover:opacity-90 transition-all duration-300 ease-in-out animate-fade-in"
                  >
                      {questionNumber === totalQuestions ? 'See Results' : 'Next Logo →'}
                  </button>
              ) : (
                  <button
                      data-cursor-interactive="true"
                      onClick={handleSubmit}
                      disabled={selectedColors.length === 0}
                      className="w-full sm:w-auto px-8 py-3 text-md font-medium text-white bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl hover:opacity-90 transition-all duration-300 ease-in-out disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
                  >
                      Submit Answer
                  </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSection;
