import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
  

const firebaseApp= initializeApp({
  apiKey: "AIzaSyC_qF9V_TfKy4lAXMj1iPPvuF7tMltCKF8",
  authDomain: "notekeeper-app-d8505.firebaseapp.com",
  databaseURL: "https://notekeeper-app-d8505-default-rtdb.firebaseio.com",
  projectId: "notekeeper-app-d8505",
  storageBucket: "notekeeper-app-d8505.appspot.com",
  messagingSenderId: "722516045085",
  appId: "1:722516045085:web:27a810095d3c37aa2b45f4",
  measurementId: "G-VGWQQ8W878"
});

export const db=getFirestore(firebaseApp);




