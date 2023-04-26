import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDFS4m9Z5s-aFrf_V9foIwwmrRqmYTVCm4",
  authDomain: "audio-defence-frontend.firebaseapp.com",
  databaseURL: "https://audio-defence-frontend-default-rtdb.firebaseio.com",
  projectId: "audio-defence-frontend",
  storageBucket: "audio-defence-frontend.appspot.com",
  messagingSenderId: "690714724840",
  appId: "1:690714724840:web:6a3551e9b76668e37b7c5d"
};
// Firebase 초기화
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const storage = firebaseApp.storage();
export const database = firebaseApp.database();
