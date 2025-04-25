import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKLlAQzrGTVbNMux11F6NNr048BkniiPA",
  authDomain: "memecoin-ai-b3916.firebaseapp.com",
  projectId: "memecoin-ai-b3916",
  storageBucket: "memecoin-ai-b3916.appspot.com",
  messagingSenderId: "6226054623",
  appId: "1:6226054623:web:24a061e37b124ad993486a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function checkUserAccess(telegramId: string): Promise<boolean> {
  try {
    const docRef = doc(db, "users", telegramId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("❌ Error checking access:", error);
    return false;
  }
}
