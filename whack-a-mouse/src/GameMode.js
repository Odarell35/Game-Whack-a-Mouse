import React from "react";
import "./GameMode.css";
import "./medium.css";
import "./HardMode.css";
import { useNavigate } from "react-router-dom";
import mousehammer from "./Img/mouse-hammer.png";
import backArrow from "./Img/back-arrow.png";

function Home() {
  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate("/EasyMode");
  };
  const handleClick2 = () => {
    navigate("/MediumMode");
  };
  const handleClick3 = () => {
    navigate("/HardMode");
  };
  const handleClick4 = () => {
    navigate("/");
  };

  return (
    <div class="container">
      <img src={mousehammer} onClick={handleClick4} alt="Mouse Character" class="mouse" />
      <div class="buttons">
        <button onClick={handleClick1} class="button red">
          EASY
        </button>
        <button onClick={handleClick2} class="button pink">
          MEDIUM
        </button>
        <button onClick={handleClick3} class="button blue">
          HARD
        </button>
      </div>
      <img
        onClick={handleClick4}
        src={backArrow}
        alt="Back Arrow"
        className="back-arrow"
      />
    </div>
  );
}

export default Home;
