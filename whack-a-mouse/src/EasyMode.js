import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addHighScore, getHighScores } from "./scorestorage";
import Mouse from "./mouse-easy";
import GameOverPopup from "./GameOverPopup"; // Import the GameOverPopup component
import "./easy.css";
import backArrow from "./Img/back-arrow.png";

const EasyBoard = () => {
  const [mice, setMice] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  let mouseInterval, timerInterval;

  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate("/GameMode");
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
  };

  const stopGame = () => {
    clearInterval(mouseInterval);
    clearInterval(timerInterval);
    setGameStarted(false);
    setIsPaused(true);
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
    if (gameStarted && !isPaused) {
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
  }, [gameStarted, isPaused]);

  useEffect(() => {
    getHighScores().then((scores) => setHighScores(scores));
  }, []);

  const submitScore = async () => {
    await addHighScore("Player", score);
    const updatedScores = await getHighScores();
    updatedScores.push({ user: "Player", score });
    updatedScores.sort((a, b) => b.score - a.score);
    setHighScores(updatedScores);
  };

  const handleHome = () => {
    navigate("/Home");
  };

  const handleReplay = () => {
    setGameOver(false);
    startGame();
  };

  return (
    <div>
      {gameOver && (
        <GameOverPopup
          score={score}
          onReplay={handleReplay}
          onHome={handleHome}
        />
      )}
      <div className="container">
        <header className="head">
          <div className="level">
            <div className="level-indicator">
              <div className="level-text">Easy</div>
              <div className="level-label">LEVEL</div>
            </div>
            <img
              onClick={handleClick1}
              src={backArrow}
              alt="Back Arrow"
              className="back-arrow-easy"
            />
          </div>
          <div className="title">WHACK-A-MOUSE!!</div>
          <div className="score-timer">
            <span className="timerBar-easy">
              <span
                className="timer-easy"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></span>
            </span>
            <div className="high-score">
              <span className="high-score-icon">&#127942;</span>
              <span className="high-score-value">
                HIGHSCORE: {highScores.length > 0 ? highScores[0].score : 0}
              </span>
            </div>
          </div>
        </header>
        <section className="game-board">
          <div className="game-area">
            {mice.map((isMouse, index) => (
              <Mouse
                key={index}
                index={index}
                isMouse={isMouse}
                handleMouseClick={handleMouseClick}
              />
            ))}
          </div>
          {!gameStarted ? (
            <button className="start-button" onClick={startGame}>
              Start
            </button>
          ) : (
            <button className="start-button" onClick={stopGame}>
              Pause
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default EasyBoard;
