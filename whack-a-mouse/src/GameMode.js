import React from 'react';
import './GameMode.css';
import './MediumMode.css';
import './HardMode.css';
import logo from './Img/logo.png';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleClick1 = () => {
        navigate('/GameBoard');
    };
    const handleClick2 = () => {
      navigate('/MediumMode');
  };
  const handleClick3 = () => {
    navigate('/HardMode');
};
    
  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} class="logo" alt='gameLogo'/>
       <button onClick={handleClick1} class="btn easy">EASY</button>
       <button onClick={handleClick2} class="btn medium">MEDIUM</button>
       <button onClick={handleClick3} class="btn hard">HARD</button>
      </header>
      
    </div>
  );
}

export default Home;