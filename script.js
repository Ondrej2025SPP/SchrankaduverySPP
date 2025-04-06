import { getDatabase, ref, push, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { app } from "./firebase-config.js";

console.log("script.js loaded"); // Debug

const db = getDatabase(app);

// Odeslání zprávy
const messageForm = document.getElementById("messageForm");
messageForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Formulář odeslán");
  const message = document.getElementById("messageInput").value.trim();
  if (!message) {
    console.log("Zpráva je prázdná");
    return;
  }
  const code = "ID" + Math.random().toString(36).substring(2, 8).toUpperCase();
  push(ref(db, "messages"), {
    code: code,
    message: message,
    reply: ""
  }).then(() => {
    console.log("Zpráva odeslána do Firebase");
    messageForm.style.display = "none";
    document.getElementById("confirmation").classList.remove("hidden");
    document.getElementById("replyCode").textContent = code;
  }).catch(err => {
    console.error("Chyba při odesílání zprávy:", err);
  });
});

// Kontrola odpovědi podle kódu
document.getElementById("checkReplyBtn").addEventListener("click", function () {
  const inputCode = document.getElementById("checkCode").value.trim();
  if (!inputCode) {
    console.log("Kód pro kontrolu je prázdný");
    return;
  }
  const dbRef = ref(db);
  get(child(dbRef, "messages")).then((snapshot) => {
    let found = false;
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      if (data.code === inputCode) {
        document.getElementById("replyOutput").innerHTML =
          data.reply ? `<p><strong>Odpověď:</strong> ${data.reply}</p>` :
          "<p>Zatím žádná odpověď.</p>";
        found = true;
      }
    });
    if (!found) {
      document.getElementById("replyOutput").innerHTML = "<p>Kód nebyl nalezen.</p>";
    }
  }).catch(err => {
    console.error("Chyba při načítání odpovědi:", err);
  });
});