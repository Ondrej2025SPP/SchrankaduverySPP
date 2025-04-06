
// Inicializace Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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

// Heslo
const ADMIN_PASSWORD = "schrankaduverySPP2025";

function login() {
  const input = document.getElementById("adminPassword").value;
  if (input === ADMIN_PASSWORD) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadMessages();
  } else {
    alert("Nesprávné heslo.");
  }
}

window.login = login;

function loadMessages() {
  const container = document.getElementById("messagesContainer");
  container.innerHTML = "";
  const messagesRef = ref(db, "messages");
  onValue(messagesRef, (snapshot) => {
    container.innerHTML = "";
    snapshot.forEach((child) => {
      const key = child.key;
      const data = child.val();
      const div = document.createElement("div");
      div.className = "message";
      div.innerHTML = `
        <p><strong>Kód:</strong> ${data.code}</p>
        <p><strong>Zpráva:</strong> ${data.message}</p>
        <textarea placeholder="Odpověď..." id="reply-${key}">${data.reply || ""}</textarea>
        <button onclick="sendReply('${key}')">Odeslat odpověď</button>
        <hr>
      `;
      container.appendChild(div);
    });
  });
}

window.sendReply = function(key) {
  const textarea = document.getElementById("reply-" + key);
  const newReply = textarea.value.trim();
  if (newReply) {
    const messageRef = ref(db, "messages/" + key);
    update(messageRef, { reply: newReply });
    alert("Odpověď uložena.");
  }
};
