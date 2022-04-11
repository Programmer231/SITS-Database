// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDllJmdNEN8alQzFZ6wjy71U-dl3N17W6I",
  authDomain: "sits-practice.firebaseapp.com",
  databaseURL: "https://sits-practice-default-rtdb.firebaseio.com",
  projectId: "sits-practice",
  storageBucket: "sits-practice.appspot.com",
  messagingSenderId: "621218416774",
  appId: "1:621218416774:web:2c238b1ed0c4a7b7afe907",
  measurementId: "G-QFMZGGDSYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app
export const auth = app.auth();