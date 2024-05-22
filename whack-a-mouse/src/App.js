import React from 'react';
import GameBoard from './Gameboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Whack a Mouse</h1>
        <GameBoard />
      </header>
    </div>
  );
}

export default App;