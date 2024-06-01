// GameOverPopup.jsx
import React from "react";
import "./GameOverPopup.css";

const GameOverPopup = ({ score, onReplay, onHome }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h1 className="game-over">GAME OVER</h1>
        <div className="score">SCORE: {score}</div>
        <div className="popup-buttons">
          <button className="home-button" onClick={onHome}>
            Home
          </button>
          <button className="replay-button" onClick={onReplay}>
            Replay
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverPopup;
