// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameMode from './GameMode';
import EasyMode from './EasyMode';
import MediumMode from './Mediummode';
import HardMode from './Hardmode';
import FirstPage from './Home';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/GameMode" element={<GameMode />}/>
        <Route path="/EasyMode" element={<EasyMode />}/>
        <Route path="/MediumMode" element={<MediumMode />}/>
        <Route path="/HardMode" element={<HardMode />}/>      </Routes>
    </Router>
  );
}

export default App;
