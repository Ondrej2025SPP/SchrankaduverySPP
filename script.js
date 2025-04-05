
// Inicializace Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {'apiKey': 'AIzaSyByfibBg6OmQn6TfM40Dj6Vo6fKUhgn5Ls', 'authDomain': 'schranka-duvery-spp.firebaseapp.com', 'databaseURL': 'https://schranka-duvery-spp-default-rtdb.europe-west1.firebasedatabase.app', 'projectId': 'schranka-duvery-spp', 'storageBucket': 'schranka-duvery-spp.appspot.com', 'messagingSenderId': '357685746373', 'appId': '1:357685746373:web:06c96b84c8043310e86eac', 'measurementId': 'G-1FL2RT5EPZ'};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Odeslání formuláře
document.getElementById("messageForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const message = document.getElementById("messageInput").value.trim();
    const code = Math.random().toString(36).substr(2, 8);

    if (message === "") return;

    const messageRef = ref(db, 'messages/' + code);
    set(messageRef, {
        message: message,
        response: ""
    }).then(() => {
        document.getElementById("confirmation").innerHTML = 
            `<p>Tvá zpráva byla odeslána. Tvůj kód pro odpověď: <strong>{code}</strong></p>`;
        document.getElementById("messageForm").reset();
    }).catch((error) => {
        console.error("Chyba při odesílání:", error);
    });
});
