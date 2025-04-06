import { getDatabase, ref, push, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { app } from "./firebase-config.js";

console.log("script.js loaded"); // Debug: potvrzení načtení skriptu

const db = getDatabase(app);

// Odeslání zprávy
document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Odesílám zprávu..."); // Debug
  const message = document.getElementById("messageInput").value.trim();
  if (!message) return;

  const code = "ID" + Math.random().toString(36).substring(2, 8).toUpperCase();
  push(ref(db, "messages"), {
    code: code,
    message: message,
    reply: ""
  }).then(() => {
    console.log("Zpráva odeslána"); // Debug
    document.getElementById("messageForm").style.display = "none";
    document.getElementById("confirmation").classList.remove("hidden");
    document.getElementById("replyCode").textContent = code;
  }).catch(err => {
    console.error("Chyba při odesílání zprávy:", err);
  });
});

// Kontrola odpovědi podle kódu
document.getElementById("checkReplyBtn").addEventListener("click", function () {
  const inputCode = document.getElementById("checkCode").value.trim();
  if (!inputCode) return;

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
    console.error("Chyba při načítání zpráv:", err);
  });
});