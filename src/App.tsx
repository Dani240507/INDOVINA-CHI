import React, { useState } from 'react';
import { Brain, Play } from 'lucide-react';
import { characters, Character } from './data/characters';
import GameRound from './components/GameRound';
import Results from './components/Results';

function App() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'results'>(
    'menu'
  );
  const [currentRound, setCurrentRound] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [gameCharacters, setGameCharacters] = useState<Character[]>([]);

  const startGame = () => {
    const shuffled = [...characters].sort(() => Math.random() - 0.3);
    setGameCharacters(shuffled.slice(0, 30));
    setGameState('playing');
    setCurrentRound(1);
    setAnswers([]);
  };

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    if (currentRound < 30) {
      setCurrentRound(currentRound + 1);
    } else {
      setGameState('results');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center">
      {gameState === 'menu' && (
        <div className="w-full max-w-md mx-auto p-6 text-center">
          <div className="mb-8">
            <Brain className="w-20 h-20 mx-auto text-indigo-600 mb-4" />
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">
              Indovina Chi!
            </h1>
            <p className="text-indigo-600">Disagiati o Idoli?</p>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6" />
            SCOPRILI TUTTI!
          </button>
        </div>
      )}

      {gameState === 'playing' && gameCharacters[currentRound - 1] && (
        <GameRound
          clue={gameCharacters[currentRound - 1].clue}
          onAnswer={handleAnswer}
          roundNumber={currentRound}
          correctAnswer={gameCharacters[currentRound - 1].name}
        />
      )}

      {gameState === 'results' && (
        <Results
          answers={answers}
          correctAnswers={gameCharacters.map((c) => c.name)}
          onPlayAgain={startGame}
        />
      )}
    </div>
  );
}

export default App;
