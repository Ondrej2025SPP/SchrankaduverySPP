
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { app } from "./firebase-config.js";

const db = getDatabase(app);

document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const message = document.getElementById("messageInput").value.trim();
  if (!message) return;
  const code = "ID" + Math.random().toString(36).substring(2, 8).toUpperCase();
  push(ref(db, "messages"), {
    code: code,
    message: message,
    reply: ""
  }).then(() => {
    document.getElementById("messageForm").style.display = "none";
    document.getElementById("confirmation").style.display = "block";
    document.getElementById("replyCode").textContent = code;
  });
});
