import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg_mU1i-NGJwC1BwKK7Oqkz3P4DS7okKc",
  authDomain: "smm-pannel-14175.firebaseapp.com",
  projectId: "smm-pannel-14175",
  storageBucket: "smm-pannel-14175.appspot.com",
  messagingSenderId: "120295079848",
  appId: "1:120295079848:web:7a8ba8b78f09066f77a79d",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth();

export { auth };
export default db;
