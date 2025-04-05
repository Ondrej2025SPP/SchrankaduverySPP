
function login() {
  const pass = document.getElementById('adminPass').value;
  if (pass === 'schrankaduverySPP2025') {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
    loadMessages();
  } else {
    alert('Nesprávné heslo');
  }
}
function loadMessages() {
  const list = document.getElementById('messageList');
  list.innerHTML = '';
  firebase.database().ref('messages/').once('value').then(snapshot => {
    snapshot.forEach(child => {
      const code = child.key;
      const data = child.val();
      const li = document.createElement('li');
      li.innerHTML = `<strong>${code}</strong>: ${data.message}<br>
        <textarea>${data.response || ''}</textarea>
        <button onclick="saveResponse('${code}', this.previousElementSibling.value)">Uložit odpověď</button>`;
      list.appendChild(li);
    });
  });
}
function saveResponse(code, response) {
  firebase.database().ref('messages/' + code).update({ response: response }, () => {
    alert('Odpověď uložena.');
    loadMessages();
  });
}
