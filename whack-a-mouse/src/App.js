import React from 'react';
import './App.css';
import logo from './Img/logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} alt='gameLogo'/>
       <button class="btn-play">PLAY</button>
      </header>
      
    </div>
  );
}

export default App;