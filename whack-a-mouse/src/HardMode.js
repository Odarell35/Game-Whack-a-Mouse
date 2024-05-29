import React, { useState, useEffect } from 'react';
import { addHighScore, getHighScores } from './scorestorage';
import Mouse from './mouse';
import './HardMode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';


const HardMode = () => {
  const [mice, setMice] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver,setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  let mouseInterval, timerInterval;

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
        const randomIndex = Math.floor(Math.random() * 12);
        newMice[randomIndex] = true;
        setMice(newMice);
      }, 350);

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
      }, 350);

      return () => {
        clearInterval(mouseInterval);
        clearInterval(timerInterval);
      };
    }
  }, [gameStarted]);

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

  return (
    <div>
      <header className='headh'>
        <div className="levelh">Level Hard </div>
        <div className='div2h'>
          <div className='titleh'>WHACK-A-MOUSE!!</div>
          <div className='score-timerh'>
            <div className="scoreh">Score: {score}</div>
			      <h2 className='high-scoreh'>High Score: {highScores.length > 0 ? highScores[0].score : 0}</h2>
      		  <FontAwesomeIcon className='iconsh' icon={faHourglass} />
            <span className='timerBarh'>
            <span className="timerh" style={{ width: `${(timeLeft / 45) * 100}%` }}></span>
            </span>

          </div>
        </div>
      </header>
      <main>
        <div className="game-boardh">
          {mice.map((isMouse, index) => (
            <Mouse key={index} index={index} isMouse={isMouse} handleMouseClick={handleMouseClick} />
          ))}
        </div>
        <div className='buttonsh'>
          <button className="btn-starth" onClick={startGame} disabled={gameStarted}>START</button>
          <button className="btn-stoph" onClick={stopGame} disabled={!gameStarted}>QUIT</button>
        </div>
      </main>
    </div>
  );
};

export default HardMode;
