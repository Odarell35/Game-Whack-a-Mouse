import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHighScore, getHighScores } from './scorestorage';
import Mouse from './mouse-medium.js';
import './medium.css';
import './Home';
import GameOverPopup from './GameOverPopup.js';
import backArrow from './Img/arrow-back.png';

const MediumBoard = () => {
  const [mice, setMice] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver,setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  let mouseInterval, timerInterval;

  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate("/GameMode");
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(45);
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
      }, 500);

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
      }, 500);

      return () => {
        clearInterval(mouseInterval);
        clearInterval(timerInterval);
      };
    }
  }, [gameStarted, isPaused]);

  	useEffect(() => {// Retrieve high scores on component mount
    	getHighScores().then((scores) => setHighScores(scores));
 	 	}, []);

		const submitScore = async () => {
			await addHighScore('Player', score);
			// Update high scores after submitting

			const updateScores = await getHighScores();
            updateScores.push({ user: 'Player', score });
            updateScores.sort((a, b) => b.score - a.score);
            const highestScore = updateScores.length > 0 ? updateScores[0].score : 0;
			setHighScores([highestScore]);
		};

    const handleHome = () => {
            navigate('/');
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
      <div class="container">
        <header class="head">
            <div class="levelm">
                <div class="level-indicatorm">
                    <div class="level-textm">Medium</div>
                    <div class="level-labelm">LEVEL</div>
                </div>
                <img onClick={handleClick1} src={backArrow} alt='Back arrow' className='back-arrow-medium'/>
            </div>
            <div class="titlem">WHACK-A-MOUSE!!</div>
            <div class="score-timerm">
                <span class="timerBarm">
                    <span class="timerm" style={{width: `${(timeLeft / 45)* 100}%`}}></span>
                </span>
                <div class="high-scorem">
                    <span class="high-score-iconm">&#127942;</span>
                    <span class="high-score-valuem">HIGHSCORE: {highScores.length > 0 ? highScores[0].score : 0}</span>
                </div>
            </div>
        </header>
        <section class="game-boardm">
            <div class="game-aream">
                {mice.map((isMouse, index) => (
                    <Mouse key={index} index={index} isMouse={isMouse} handleMouseClick={handleMouseClick} />
                ))}
            </div>
            {!gameStarted ? (
            <button class="start-buttonm" onClick={startGame} >Start</button>) :(
            <button class="start-buttonm" onClick={stopGame} >Pause</button>)}
        </section>
    </div>
  </div>
    );
};

export default MediumBoard;
