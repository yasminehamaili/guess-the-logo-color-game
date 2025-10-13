import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-interactive="true"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const cursorDotStyle: React.CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
  };

  const cursorOutlineStyle: React.CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-600 pointer-events-none z-50 ${isHovering ? 'bg-transparent' : ''}`}
        style={cursorDotStyle}
      ></div>
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-600 pointer-events-none z-50 ${isHovering ? 'w-16 h-16 border-2' : 'w-8 h-8'}`}
        style={cursorOutlineStyle}
      ></div>
    </>
  );
};

export default CustomCursor;