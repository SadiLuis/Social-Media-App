import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase/Firebase";



export default async function isUsernameExists(username) {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  }