import React from 'react';
import './mouse-hard.css'
import mice from './Img/mice.png';

const Mouse = ({ index, isMouse, handleMouseClick }) => {
  return (
    <div className="mouse-holeh" onClick={() => handleMouseClick(index)}>
      {isMouse && <div className="mouseh">
      <img className="Mouse-pawnh" src={mice} alt='gamemice'/>
        </div>}
    </div>
  );
};

export default Mouse;
