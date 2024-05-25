import React, { useState, useEffect } from 'react';
import Mouse from './mouse';
import './GameBoard.css';

const GameBoard = () => {
  const [mice, setMice] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [intervalTime, setIntervalTime] = useState(1000); // Initial interval time
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const requiredScore = 10; // Required score to advance to the next level

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(storedLeaderboard);
    if (storedLeaderboard.length > 0) {
      setHighScore(storedLeaderboard[0].score); // Set the high score to the top score on the leaderboard
    }
  }, []);

  useEffect(() => {
    if (gameStarted && score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore, gameStarted]);

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        const newMice = Array(9).fill(false);
        const randomIndex = Math.floor(Math.random() * 9);
        newMice[randomIndex] = true;
        setMice(newMice);
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [gameStarted, intervalTime]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (score >= requiredScore) {
        setLevel((prevLevel) => prevLevel + 1);
        setIntervalTime((prevInterval) => prevInterval * 0.9); // Increase difficulty
        setTimeLeft(30); // Reset time for the next level
        setScore(0); // Reset score for the new level
      } else {
        saveScore(playerName, score);
        setGameStarted(false);
      }
    }
  }, [timeLeft, score, requiredScore, playerName]);

  const handleMouseClick = (index) => {
    if (mice[index]) {
      setScore((prevScore) => prevScore + 1);
      const newMice = [...mice];
      newMice[index] = false;
      setMice(newMice);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setIntervalTime(1000);
  };

  const restartGame = () => {
    setGameStarted(false);
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setIntervalTime(1000);
  };

  const saveScore = (name, score) => {
    const newLeaderboard = [...leaderboard, { name, score }];
    newLeaderboard.sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard);
    localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
  };

  return (
    <div>
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Whack-a-Mouse</h1>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={playerName} 
            onChange={(e) => setPlayerName(e.target.value)} 
          />
          <button className="start-button" onClick={startGame} disabled={!playerName}>Start Game</button>
          <button className="restart-button" onClick={restartGame}>Restart Game</button>
          <div className="high-score">High Score: {highScore}</div>
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ol>
              {leaderboard.map((entry, index) => (
                <li key={index}>{entry.name}: {entry.score}</li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <div>
          <div className="score">Score: {score}</div>
          <div className="level">Level: {level}</div>
          <div className="high-score">High Score: {highScore}</div>
          <div className="timer">Time Left: {timeLeft} seconds</div>
          <div className="game-board">
            {mice.map((isMouse, index) => (
              <Mouse key={index} index={index} isMouse={isMouse} handleMouseClick={handleMouseClick} />
            ))}
          </div>
          <button className="restart-button" onClick={restartGame}>Restart Game</button>
        </div>
      )}
      {timeLeft === 0 && score < requiredScore && (
        <div className="game-over-screen">
          <h2>Your score is {score}</h2>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
