import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getApp } from "firebase/app";

interface CreatePaymentArgs {
  telegram_id: string;
  wallet: string;
  plan: "30d" | "lifetime";
}

export async function createPayment({ telegram_id, wallet, plan }: CreatePaymentArgs) {
  const app = getApp();
  const db = getFirestore(app);

  const docRef = await addDoc(collection(db, "pending_payments"), {
    telegram_id,
    wallet: wallet.toLowerCase(),
    plan,
    status: "pending",
    created_at: serverTimestamp(),
  });

  return docRef.id;
}
