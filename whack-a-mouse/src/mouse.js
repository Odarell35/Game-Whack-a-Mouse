import React from 'react';
import './Mouse.css';

const Mouse = ({ index, isMouse, handleMouseClick }) => {
  return (
    <div className="mouse-hole" onClick={() => handleMouseClick(index)}>
      {isMouse && <div className="mouse">💖</div>}
    </div>
  );
};

export default Mouse;
