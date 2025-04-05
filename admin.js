import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore, collection, onSnapshot, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyByfibBg6Omq6nTfM4oDj6Vo6fKUhgn5Ls",
  authDomain: "schranka-duvery-spp.firebaseapp.com",
  databaseURL: "https://schranka-duvery-spp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "schranka-duvery-spp",
  storageBucket: "schranka-duvery-spp.appspot.com",
  messagingSenderId: "357685746373",
  appId: "1:357685746373:web:06c96b84c8043310e86eac",
  measurementId: "G-1F2LRT5EPZ"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const pass = document.getElementById("adminPassword").value;
  if (pass === "SPP2055SD") {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    loadQuestions();
  } else {
    alert("Neplatné heslo");
  }
});

function loadQuestions() {
  onSnapshot(collection(db, "queries"), (snapshot) => {
    const list = document.getElementById("questionsList");
    list.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>Kód:</strong> ${data.code}</p>
        <p><strong>Dotaz:</strong> ${data.question}</p>
        <textarea id="answer-${docSnap.id}">${data.answer || ""}</textarea>
        <button onclick="saveAnswer('${docSnap.id}')">Uložit</button>
        <hr>
      `;
      list.appendChild(div);
    });
  });
}

window.saveAnswer = async function(id) {
  const newAnswer = document.getElementById("answer-" + id).value.trim();
  await updateDoc(doc(db, "queries", id), { answer: newAnswer });
  alert("Odpověď uložena");
};