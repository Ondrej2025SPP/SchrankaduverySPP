import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { app } from "./firebase-config.js";

const db = getDatabase(app);
const ADMIN_PASSWORD = "schrankaduverySPP2025";

window.login = function () {
  const input = document.getElementById("adminPassword").value;
  if (input === ADMIN_PASSWORD) {
    document.getElementById("adminPassword").style.display = "none";
    document.querySelector("button").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadMessages();
  } else {
    alert("Nesprávné heslo.");
  }
};

function loadMessages() {
  const messagesRef = ref(db, "messages");
  const container = document.getElementById("messagesContainer");
  onValue(messagesRef, (snapshot) => {
    container.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const data = childSnapshot.val();
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>Kód:</strong> ${data.code}</p>
        <p><strong>Zpráva:</strong> ${data.message}</p>
        <textarea id="reply-${key}" placeholder="Odpověď">${data.reply || ""}</textarea>
        <button onclick="replyMessage('${key}')">Odeslat odpověď</button>
        <hr>
      `;
      container.appendChild(div);
    });
  });
}

window.replyMessage = function (key) {
  const replyText = document.getElementById("reply-" + key).value;
  const msgRef = ref(db, "messages/" + key);
  update(msgRef, { reply: replyText });
};