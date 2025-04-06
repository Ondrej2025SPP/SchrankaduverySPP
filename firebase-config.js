import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyByfibBg6Omq6nTfM4oDj6vO6fKUhgn5Ls",
  authDomain: "schranka-duvery-spp.firebaseapp.com",
  databaseURL: "https://schranka-duvery-spp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "schranka-duvery-spp",
  storageBucket: "schranka-duvery-spp.appspot.com",
  messagingSenderId: "357685746373",
  appId: "1:357685746373:web:06c96b84c8043310e86eac",
  measurementId: "G-1F2LRT5EPZ"
};

export const app = initializeApp(firebaseConfig);