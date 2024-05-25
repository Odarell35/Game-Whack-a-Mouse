import React from 'react';
import './App.css';
import logo from './Img/logo.png';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/next');
    };
    
  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} alt='gameLogo'/>
       <button onClick={handleClick} class="btn-play">PLAY</button>
      </header>
      
    </div>
  );
}

export default Home;