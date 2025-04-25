// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKLlAQzrGTVbNMux11F6NNr048BkniiPA",
  authDomain: "memecoin-ai-b3916.firebaseapp.com",
  projectId: "memecoin-ai-b3916",
  storageBucket: "memecoin-ai-b3916.appspot.com", // 🔧 fixed typo: should be `.appspot.com`
  messagingSenderId: "6226054623",
  appId: "1:6226054623:web:24a061e37b124ad993486a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
