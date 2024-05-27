import React, { useState, useEffect } from 'react';
import Mouse from './mouse';
import './GameBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

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
      

      <body>
        <div className='game'>

        <header className='head'>
      <div className="level">Level 5</div>
      <div className='div2'>
       <div className='title'>WHACK-A-MOUSE!!</div>
       <div className='score-timer'>
       <div className="score">Score: {score}</div>
        <div className='timer'><FontAwesomeIcon className='icons' icon={faHourglass} /> Timer</div>
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
          <button  class="btn-start">START</button>
          <button  class="btn-stop">STOP</button></div>
          </main>
        </div>
      
      </body>
      
    </div>
  );
};

export default GameBoard;
