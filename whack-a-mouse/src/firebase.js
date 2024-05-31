// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATLJbd1F9spkO2lHrDo1lUX6pu9S5MCtE",
  authDomain: "whack-a-mouse-c7072.firebaseapp.com",
  databaseURL: "https://whack-a-mouse-c7072-default-rtdb.firebaseio.com",
  projectId: "whack-a-mouse-c7072",
  storageBucket: "whack-a-mouse-c7072.appspot.com",
  messagingSenderId: "1072135232502",
  appId: "1:1072135232502:web:9e39137772f1f2db8185d7",
  measurementId: "G-CH3D4EVMRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;