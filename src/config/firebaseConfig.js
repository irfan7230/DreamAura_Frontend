import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyCWAa2p49UDsqXoqkjAFg2p34GJ9dg5Dds",
  authDomain: "dreamweb-6acb3.firebaseapp.com",
  projectId: "dreamweb-6acb3",
  storageBucket: "dreamweb-6acb3.appspot.com",
  messagingSenderId: "1098337559221",
  appId: "1:1098337559221:web:ae25e967cda58a09de14fc",
  measurementId: "G-R1MKVEZ51W",
  databaseURL: "https://dreamweb-6acb3-default-rtdb.asia-southeast1.firebasedatabase.app/"  // Add the Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Authentication
const database = getDatabase(app);  // Initialize Realtime Database

export { auth, database };  // Export both auth and database
