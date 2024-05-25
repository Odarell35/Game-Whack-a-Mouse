// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import GameBoard from './Gameboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/next" element={<GameBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
