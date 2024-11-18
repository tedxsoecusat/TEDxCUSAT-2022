import { User } from "src/types";
import firebase from "firebase/compat/app";
import { auth, db, googleAuthProvider } from ".";

const users = db.collection("users");

export const signInWithGoogle = async () => {
  await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  return auth.signInWithPopup(googleAuthProvider);
};

export const signout = () => {
  return auth.signOut();
};

export const createUser = (data: User) => {
  return users.doc(data.uid).set(data);
};

export const updateUser = (uid: any, data: object) => {
  return users.doc(uid).update(data);
};

export const getUser = (id: string) => {
  return users.doc(id).get();
};

export const getUserReciepts = (id: string) => {
  return users.doc(id).collection("receipts").get();
};

export const addNewReceipt = (uid: string, status: string) => {
  return users.doc(uid).collection("receipts").add({ status });
};

export const getUserFromEmail = (email: string) => {
  return users.where("email", "==", email).get();
};

export const verifyAuthState = (
  loggedInHandler: (uid: User) => void,
  notLoggedInHandler: () => void
) => {
  auth.onAuthStateChanged((user) =>
    user
      ? loggedInHandler({
          uid: user?.uid,
          name: user?.displayName ?? "",
          phno: "",
          email: user?.email as string,
          image: user?.photoURL ?? "",
        })
      : notLoggedInHandler()
  );
};
