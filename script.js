
function generateCode() {
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}

function submitMessage() {
  const message = document.getElementById('messageInput').value.trim();
  if (!message) return alert('Zpráva nesmí být prázdná.');

  const code = generateCode();
  localStorage.setItem('msg_' + code, JSON.stringify({ message }));

  document.getElementById('generatedCode').innerText = code;
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('code-display').style.display = 'block';
}

function checkResponse() {
  const code = document.getElementById('codeInput').value.trim().toUpperCase();
  const stored = localStorage.getItem('msg_' + code);
  if (!stored) return alert('Kód nenalezen.');

  const data = JSON.parse(stored);
  document.getElementById('responseDisplay').innerText = data.response || 'Zatím žádná odpověď.';
}
