import React, { useState, useEffect } from 'react';
import Mouse from './mouse';
import './GameBoard.css';

const GameBoard = () => {
  const [mice, setMice] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMice = Array(9).fill(false);
      const randomIndex = Math.floor(Math.random() * 9);
      newMice[randomIndex] = true;
      setMice(newMice);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseClick = (index) => {
    if (mice[index]) {
      setScore(score + 1);
      const newMice = [...mice];
      newMice[index] = false;
      setMice(newMice);
    }
  };

  return (
    <div>
      <div className="score">Score: {score}</div>
      <div className="game-board">
        {mice.map((isMouse, index) => (
          <Mouse key={index} index={index} isMouse={isMouse} handleMouseClick={handleMouseClick} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;