// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import GameBoard from './Gameboard';
import GameMode from './GameMode';
import MediumMode from './MediumMode'
import HardMode from './HardMode';

function App() {
  return (


    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GameMode" element={<GameMode />}/>
        <Route path="/GameBoard" element={<GameBoard />}/>
        <Route path="/MediumMode" element={<MediumMode />}/>
        <Route path="/HardMode" element={<HardMode />}/>
        

      </Routes>
    </Router>
  );
}

export default App;
