import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


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

document.getElementById("questionForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = document.getElementById("questionInput").value.trim();
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  await addDoc(collection(db, "queries"), {
    question,
    answer: "",
    code,
    timestamp: serverTimestamp()
  });
  document.getElementById("questionCode").innerHTML = `<p><strong>Tvůj kód:</strong> <code>${code}</code></p>`;
});

document.getElementById("checkForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  const q = query(collection(db, "queries"), where("code", "==", code));
  const qsnap = await getDocs(q);
  if (qsnap.empty) {
    document.getElementById("answerSection").innerText = "Dotaz s tímto kódem nebyl nalezen.";
  } else {
    qsnap.forEach(doc => {
      const data = doc.data();
      document.getElementById("answerSection").innerHTML = `
        <p><strong>Tvůj dotaz:</strong> ${data.question}</p>
        <p><strong>Odpověď:</strong> ${data.answer || "Zatím bez odpovědi."}</p>`;
    });
  }
});