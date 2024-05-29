// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export default database;
