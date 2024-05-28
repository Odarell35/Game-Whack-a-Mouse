import React from 'react';
import './Home.css';
import logo from './Img/logo.png';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/GameMode');
    };
    
  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} class="home-logo" alt='gameLogo'/>
       <button onClick={handleClick} class="btn-play">PLAY</button>
      </header>
      
    </div>
  );
}

export default Home;