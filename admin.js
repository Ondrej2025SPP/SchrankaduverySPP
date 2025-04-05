const password = "schrankaduverySPP2025";

function login() {
  const input = document.getElementById("adminPass").value;
  if (input === password) {
    document.getElementById("login").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadMessages();
  } else {
    alert("Nesprávné heslo.");
  }
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("messages") || "{}");
  const list = document.getElementById("messageList");
  list.innerHTML = "";

  Object.keys(messages).forEach(code => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>Kód:</strong> ${code}<br><strong>Zpráva:</strong> ${messages[code].text}<br>
    <strong>Odpověď:</strong> <input data-code="${code}" value="${messages[code].reply || ""}" />
    <button onclick="saveReply(this)">Uložit</button>`;
    list.appendChild(li);
  });
}

function saveReply(button) {
  const input = button.previousElementSibling;
  const code = input.getAttribute("data-code");
  const messages = JSON.parse(localStorage.getItem("messages") || "{}");

  if (messages[code]) {
    messages[code].reply = input.value;
    localStorage.setItem("messages", JSON.stringify(messages));
    alert("Odpověď uložena.");
  }
}