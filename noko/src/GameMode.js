import React from 'react';
import './Gamemode.css';
import './medium.css';
import './Hardmode.css';
import { useNavigate } from 'react-router-dom';
import mousehammer from './Img/mouse-hammer.png';

function Home() {
    const navigate = useNavigate();
    const handleClick1 = () => {
        navigate('/EasyMode');
    };
    const handleClick2 = () => {
      navigate('/MediumMode');
  };
  const handleClick3 = () => {
    navigate('/HardMode');
};
const handleClick4 = () => {
  navigate('/');
};
    
  return (
    <div class="container">
      <img src={mousehammer} alt="Mouse Character" class="mouse"/>
      <div class="buttons">
        <button onclick={handleClick1} class="button red">EASY</button>
        <button onclick={handleClick2} class="button pink">MEDIUM</button>
        <button onclick={handleClick3} class="button blue">HARD</button>
      </div>
      <img src="./Img/back-arrow.png" onclick={handleClick4} alt="Back Arrow" class="back-arrow"/>
  </div>
);
}

export default Home;