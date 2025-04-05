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

function login() {
  const pwd = document.getElementById("adminPassword").value;
  if (pwd === "schrankaduverySPP2025") {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    db.ref("messages").once("value", snapshot => {
      const list = document.getElementById("messagesList");
      list.innerHTML = "";
      snapshot.forEach(child => {
        const li = document.createElement("li");
        li.textContent = `${child.key}: ${child.val().message}`;
        list.appendChild(li);
      });
    });
  } else {
    alert("Nesprávné heslo!");
  }
}