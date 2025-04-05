
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
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('msg_')) {
      const data = JSON.parse(localStorage.getItem(key));
      const li = document.createElement('li');
      li.innerHTML = `<strong>${key.slice(4)}</strong>: ${data.message}<br>
        <textarea placeholder='Odpověď...'>${data.response || ''}</textarea>
        <button onclick="saveResponse('${key}', this.previousElementSibling.value)">Uložit odpověď</button>`;
      list.appendChild(li);
    }
  }
}

function saveResponse(key, response) {
  const data = JSON.parse(localStorage.getItem(key));
  data.response = response;
  localStorage.setItem(key, JSON.stringify(data));
  alert('Odpověď uložena.');
}
