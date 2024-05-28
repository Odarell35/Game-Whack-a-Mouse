import React, { useState, useEffect, useCallback } from 'react';
import Mouse from './mouse';
import './GameBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

const GameBoard = () => {
  const [mice, setMice] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  let mouseInterval, timerInterval;

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameStarted(true);
  };

  const stopGame = () => {
    clearInterval(mouseInterval);
    clearInterval(timerInterval);
    setGameOver(true);
    setGameStarted(false);
  };

  const handleMouseClick = (index) => {
    if (mice[index]) {
      setScore(score + 1);
      const newMice = [...mice];
      newMice[index] = false;
      setMice(newMice);
    }
  };

  useEffect(() => {
    if (gameStarted) {
      mouseInterval = setInterval(() => {
        const newMice = Array(9).fill(false);
        const randomIndex = Math.floor(Math.random() * 9);
        newMice[randomIndex] = true;
        setMice(newMice);
      }, 1000);

      timerInterval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            clearInterval(mouseInterval);
            clearInterval(timerInterval);
            setGameOver(true);
            setGameStarted(false);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => {
        clearInterval(mouseInterval);
        clearInterval(timerInterval);
      };
    }
  }, [gameStarted]);

  return (
    <div>
      <header className='head'>
        <div className="level">Level 5</div>
        <div className='div2'>
          <div className='title'>WHACK-A-MOUSE!!</div>
          <div className='score-timer'>
            <div className="score">Score: {score}</div>
            <FontAwesomeIcon className='icons' icon={faHourglass} />
            <span className='timerBar'>
            <span className="timer" style={{ width: `${(timeLeft / 60) * 100}%` }}></span>
            </span>

          </div>
        </div>
      </header>
      <main>
        <div className="game-board">
          {mice.map((isMouse, index) => (
            <Mouse key={index} index={index} isMouse={isMouse} handleMouseClick={handleMouseClick} />
          ))}
        </div>
        <div className='buttons'>
          <button className="btn-start" onClick={startGame} disabled={gameStarted}>START</button>
          <button className="btn-stop" onClick={stopGame} disabled={!gameStarted}>STOP</button>
        </div>
      </main>
    </div>
  );
};

export default GameBoard;
