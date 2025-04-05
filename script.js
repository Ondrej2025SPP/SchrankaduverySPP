document.getElementById("messageForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const text = document.getElementById("messageInput").value;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const messages = JSON.parse(localStorage.getItem("messages") || "{}");
  messages[code] = { text };
  localStorage.setItem("messages", JSON.stringify(messages));
  document.getElementById("confirmation").innerHTML = "Zpráva odeslána. Tvůj kód: <strong>" + code + "</strong>";
  this.reset();
});

document.getElementById("checkForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  const messages = JSON.parse(localStorage.getItem("messages") || "{}");
  const msg = messages[code];
  const display = document.getElementById("responseDisplay");

  if (msg) {
    display.innerHTML = "<strong>Tvoje zpráva:</strong><br>" + msg.text + "<br><strong>Odpověď:</strong><br>" + (msg.reply || "Zatím žádná odpověď.");
  } else {
    display.innerText = "Zpráva s tímto kódem nebyla nalezena.";
  }
});