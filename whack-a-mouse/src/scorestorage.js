// scoresService.js

import database from './firebase';
import { ref, push, query, orderByChild, limitToLast, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

export const addHighScore = (user, score) => {
  const highScoresRef = ref(database, 'highscores');
  push(highScoresRef, { user, score });
};

export const getHighScores = async (limit = 100) => {
  try {
    const highScoresRef = ref(database, 'highscores');
    const highScoresQuery = query(highScoresRef, orderByChild('score'), limitToLast(limit));
    const snapshot = await get(highScoresQuery);
    const highScores = [];
    snapshot.forEach((childSnapshot) => {
      const { user, score } = childSnapshot.val();
      highScores.push({ user, score });
    });
    return highScores.reverse(); // Return in descending order (highest score first)
  } catch (error) {
    console.error('Error retrieving high scores:', error);
    return [];
  }
};
