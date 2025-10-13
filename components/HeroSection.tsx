import React, { useState, useEffect } from 'react';

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center min-h-screen transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: "'Sora', sans-serif" }}>
        Guess the Logo Color
      </h1>
      <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
        Test your visual memory and design sense, can you match brands to their true colors?
      </p>
      <button
        data-cursor-interactive="true"
        onClick={onStart}
        className="mt-12 px-10 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Start Game
      </button>
       <p className="mt-16 text-sm text-gray-500">By Design Department</p>
    </div>
  );
};

export default HeroSection;