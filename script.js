
const firebaseConfig = {
  apiKey: "AIzaSyDcJGaeBBHDsOhwFrAzR45-QNym-MsO2SA",
  authDomain: "schranka-duvery-spp.firebaseapp.com",
  databaseURL: "https://schranka-duvery-spp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "schranka-duvery-spp",
  storageBucket: "schranka-duvery-spp.appspot.com",
  messagingSenderId: "189730453261",
  appId: "1:189730453261:web:9c90552966f3f94a4c1926"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.getElementById('trustBoxForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const message = document.getElementById('messageInput').value;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  db.ref('messages/' + code).set({ message: message });
  document.getElementById('codeDisplay').style.display = 'block';
  document.getElementById('codeDisplay').textContent = "Tvůj anonymní kód: " + code;
});

function checkResponse() {
  const code = document.getElementById('codeInput').value.trim().toUpperCase();
  db.ref("messages/" + code).once("value", snapshot => {
    const data = snapshot.val();
    if (data) {
      document.getElementById("responseContainer").innerText = data.response || "Zatím žádná odpověď.";
    } else {
      alert("Zpráva s tímto kódem nebyla nalezena.");
    }
  });
}
