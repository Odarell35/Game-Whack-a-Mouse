import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHighScore, getHighScores } from './scorestorage';
import Mouse from './mouse-hard.js';
import './Hardmode.css';

const Popup = ({ children, onClose }) => (
  <div className="popup-overlay">
    <div className="popup-content">
      {children}
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  </div>
);

const HardBoard = () => {
  const [mice, setMice] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  let mouseInterval, timerInterval;

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(true);
  };

  const stopGame = () => {
    clearInterval(mouseInterval);
    clearInterval(timerInterval);
    setGameOver(true);
    setGameStarted(false);
    submitScore();
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
      }, 250);

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

  useEffect(() => {
    getHighScores().then((scores) => setHighScores(scores));
  }, []);

  const submitScore = async () => {
    await addHighScore('Player', score);
    const updatedScores = await getHighScores();
    updatedScores.push({ user: 'Player', score });
    updatedScores.sort((a, b) => b.score - a.score);
    setHighScores(updatedScores);
  };

  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate('/');
  };

  return (
    <div>
      {gameOver && (
        <Popup>
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
          <button onClick={() => { setGameOver(false); startGame(); }}>Play Again</button>
          <button onClick={handleClick1}>Home</button>
        </Popup>
      )}
      <div className="container">
        <header className="head">
          <div className="level">
            <div className="level-indicator">
              <div className="level-text">Hard</div>
              <div className="level-label">LEVEL</div>
            </div>
            <div className="back-button" onClick={handleClick1}>
              <span className="back-icon">&#8592;</span>
            </div>
          </div>
          <div className="title">WHACK-A-MOUSE!!</div>
          <div className="score-timer">
            <span className="timerBar">
              <span className="timer" style={{ width: `${(timeLeft / 30) * 100}%` }}></span>
            </span>
            <div className="high-score">
              <span className="high-score-icon">&#127942;</span>
              <span className="high-score-value">HIGHSCORE: {highScores.length > 0 ? highScores[0].score : 0}</span>
            </div>
          </div>
        </header>
        <section className="game-board">
          <div className="game-area">
            {mice.map((isMouse, index) => (
              <Mouse key={index} index={index} isMouse={isMouse} handleMouseClick={handleMouseClick} />
            ))}
          </div>
          <button className="start-button" onClick={startGame} disabled={gameStarted}>Start</button>
          <button className="start-button" onClick={stopGame} disabled={!gameStarted}>Pause</button>
        </section>
      </div>
    </div>
  );
};

export default HardBoard;
