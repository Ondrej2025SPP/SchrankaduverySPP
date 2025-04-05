
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase konfigurace – ověřená dle uživatelem zaslaného screenshotu
const firebaseConfig = {
  apiKey: "AIzaSyByfibBg6OmQn6TfM40Dj6Vo6fKUhgn5Ls",
  authDomain: "schranka-duvery-spp.firebaseapp.com",
  databaseURL: "https://schranka-duvery-spp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "schranka-duvery-spp",
  storageBucket: "schranka-duvery-spp.appspot.com",
  messagingSenderId: "357685746373",
  appId: "1:357685746373:web:06c96b84c8043310e86eac",
  measurementId: "G-1FL2RT5EPZ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const messagesRef = ref(db, "messages");

onValue(messagesRef, (snapshot) => {
  const data = snapshot.val();
  const container = document.getElementById("adminMessages");
  container.innerHTML = "";

  if (data) {
    Object.entries(data).forEach(([code, obj]) => {
      const div = document.createElement("div");
      div.className = "message";
      div.innerHTML = `
        <p><strong>Kód:</strong> ${code}</p>
        <p><strong>Zpráva:</strong> ${obj.message}</p>
        <p><strong>Odpověď:</strong> ${obj.response || "zatím žádná"}</p>
        <textarea id="response-${code}" rows="2" placeholder="Napiš odpověď...">${obj.response || ""}</textarea>
        <button onclick="sendResponse('${code}')">Odeslat odpověď</button>
        <hr>
      `;
      container.appendChild(div);
    });
  } else {
    container.innerHTML = "<p>Žádné zprávy zatím nejsou.</p>";
  }
});

window.sendResponse = function(code) {
  const responseText = document.getElementById("response-" + code).value;
  const messageRef = ref(db, "messages/" + code);
  update(messageRef, { response: responseText });
};
