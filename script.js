
// Inicializace Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("messageForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const message = document.getElementById("messageInput").value.trim();
    if (message) {
        const code = "ID" + Math.random().toString(36).substr(2, 6).toUpperCase();
        push(ref(db, 'messages'), {
            code: code,
            message: message,
            reply: ""
        }).then(() => {
            document.getElementById("messageForm").style.display = "none";
            document.getElementById("confirmation").style.display = "block";
            document.getElementById("replyCode").textContent = code;
        });
    }
});
