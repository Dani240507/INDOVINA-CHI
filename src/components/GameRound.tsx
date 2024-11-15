import React, { useState, useEffect } from 'react';
import { Timer, Send } from 'lucide-react';
import WrongAnswerBackground from './WrongAnswerBackground';

interface GameRoundProps {
  clue: string;
  onAnswer: (answer: string) => void;
  roundNumber: number;
  correctAnswer: string;
}

export default function GameRound({
  clue,
  onAnswer,
  roundNumber,
  correctAnswer,
}: GameRoundProps) {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(220);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleAnswer();
    }
  }, [timeLeft]);

  const handleAnswer = () => {
    if (answer.toLowerCase() !== correctAnswer.toLowerCase()) {
      setShowWrongAnswer(true);
    }
    onAnswer(answer);
    setAnswer('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAnswer();
  };

  return (
    <>
      {showWrongAnswer && <WrongAnswerBackground correctName={correctAnswer} />}
      <div className="w-full max-w-md mx-auto p-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">
              Disagiato o Idolo {roundNumber}
            </h2>
            <div className="flex items-center gap-2 text-orange-500">
              <Timer className="w-5 h-5" />
              <span className="font-mono text-xl">{timeLeft}s</span>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 mb-6">
            <p className="text-lg text-center italic">"{clue}"</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Chi è?"
              className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Scopri il prossimo personaggio
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
