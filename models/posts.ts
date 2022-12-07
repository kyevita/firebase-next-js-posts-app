import firebase from "firebase/compat/app";
import { firestore } from "../lib/firebase";
import { applyOptions, QueryOptions } from "./base";

const COLLECTION_NAME = "posts";

export interface Post {
  title: string;
  slug: string;
  uid: string;
  username: string;
  published: boolean;
  content: string;
  createdAt: firebase.firestore.Timestamp | number;
  updatedAt: firebase.firestore.Timestamp | number;
  heartCount: number;
}

export type PostQueryOptions = QueryOptions<keyof Post>;

export function postToJSON(doc: firebase.firestore.DocumentData) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export async function getPostsByUserDoc(
  userDoc: firebase.firestore.DocumentData,
  options?: PostQueryOptions
): Promise<Post[]> {
  const postQuery = applyOptions<PostQueryOptions>(
    userDoc.ref.collection(COLLECTION_NAME),
    options
  );

  return (await postQuery.get()).docs.map(postToJSON);
}

export async function getPostByIdByUserDoc(
  id: string,
  userDoc: firebase.firestore.DocumentData
): Promise<Post & { _path: string }> {
  const postRef = userDoc.ref.collection("posts").doc(id);
  const post = await postRef.get();

  return { ...postToJSON(post), _path: postRef.path };
}

export async function getPosts(options?: PostQueryOptions): Promise<Post[]> {
  const postsQuery = applyOptions<PostQueryOptions>(
    firestore.collectionGroup(COLLECTION_NAME),
    options
  );

  return (await postsQuery.get()).docs.map(postToJSON);
}
