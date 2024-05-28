import React from 'react';
import './GameMode.css';
import logo from './Img/logo.png';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/GameBoard');
    };
    
  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} class="logo" alt='gameLogo'/>
       <button onClick={handleClick} class="btn easy">EASY</button>
       <button onClick={handleClick} class="btn medium">MEDIUM</button>
       <button onClick={handleClick} class="btn hard">HARD</button>
      </header>
      
    </div>
  );
}

export default Home;