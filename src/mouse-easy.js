import React from "react";
import "./Mouse-easy.css";
import mice from "./Img/mice.png";

const Mouse = ({ index, isMouse, handleMouseClick }) => {
  return (
    <div className="mouse-hole" onClick={() => handleMouseClick(index)}>
      {isMouse && <img className="Mouse-pawn-easy" src={mice} alt="gamemice" />}{" "}
      {}
    </div>
  );
};

export default Mouse;
