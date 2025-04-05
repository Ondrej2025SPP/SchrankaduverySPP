
function generateCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}
function submitMessage() {
  const message = document.getElementById('messageInput').value.trim();
  if (!message) return alert('Zpráva nesmí být prázdná.');
  const code = generateCode();
  firebase.database().ref('messages/' + code).set({
    message: message,
    timestamp: Date.now()
  }, () => {
    document.getElementById('generatedCode').innerText = code;
    document.getElementById('code-display').style.display = 'block';
  });
}
function checkResponse() {
  const code = document.getElementById('codeInput').value.trim().toUpperCase();
  firebase.database().ref('messages/' + code).once('value').then(snapshot => {
    const data = snapshot.val();
    if (data) {
      document.getElementById('responseDisplay').innerText = data.response || 'Zatím žádná odpověď.';
    } else {
      alert('Kód nenalezen.');
    }
  });
}
