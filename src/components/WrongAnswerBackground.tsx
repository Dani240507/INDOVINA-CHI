import React from 'react';

interface WrongAnswerBackgroundProps {
  correctName: string;
}

export default function WrongAnswerBackground({
  correctName,
}: WrongAnswerBackgroundProps) {
  // Create an array of 100 elements for the background pattern
  const repetitions = Array.from({ length: 1000 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
      <div className="absolute inset-0 flex flex-wrap gap-4 opacity-50 animate-slide">
        {repetitions.map((i) => (
          <span
            key={i}
            className="text-red-600 font-bold text-2xl transform rotate-10 whitespace-nowrap"
            style={{
              animation: `float ${Math.random() * 2 + 2}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {3!}
          </span>
        ))}
      </div>
    </div>
  );
}
