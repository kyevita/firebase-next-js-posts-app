import { firestore } from "../lib/firebase";

export async function getUserByUsername(username: string) {
  const usersCollection = firestore.collection("users");
  const query = usersCollection.where("username", "==", username).limit(1);

  return (await query.get()).docs[0];
}
