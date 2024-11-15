import React from 'react';
import { Trophy, Check, X } from 'lucide-react';

interface ResultsProps {
  answers: string[];
  correctAnswers: string[];
  onPlayAgain: () => void;
}

export default function Results({
  answers,
  correctAnswers,
  onPlayAgain,
}: ResultsProps) {
  const score = answers.filter(
    (answer, i) => answer.toLowerCase() === correctAnswers[i].toLowerCase()
  ).length;
  const isWinner = score >= Math.ceil(correctAnswers.length / 2);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-8">
          {isWinner ? (
            <div className="animate-bounce">
              <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
              <h2 className="text-2xl font-bold text-indigo-600 mt-4">
                Complimenti, conosci benissimo tutti i disagiati! (Mi spiace
                sinceramente per te)
              </h2>
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-indigo-600">
              Partita Finita!
            </h2>
          )}
          <p className="text-lg mt-2">
            Punteggio: {score}/{correctAnswers.length}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {answers.map((answer, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                {answer.toLowerCase() ===
                correctAnswers[index].toLowerCase() ? (
                  <Check className="w-6 h-6 text-green-500" />
                ) : (
                  <X className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-medium">La tua risposta: {answer}</p>
                <p className="text-sm text-gray-600">
                  Risposta corretta: {correctAnswers[index]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Gioca Ancora
        </button>
      </div>
    </div>
  );
}
