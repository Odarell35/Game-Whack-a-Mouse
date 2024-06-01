import React from 'react';
import './mouse-hard.css'
import mice from './Img/mice.png';

const Mouse = ({ index, isMouse, handleMouseClick }) => {
  return (
    <div className="mouse-holeh" onClick={() => handleMouseClick(index)}>
      {isMouse && <div className="mouse">
      <img className="Mouse-pawn" src={mice} alt='gamemice'/>
        </div>}
    </div>
  );
};

export default Mouse;