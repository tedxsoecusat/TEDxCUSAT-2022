import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/analytics";
import { getAnalytics } from "firebase/analytics";
import config from "src/common/config";
import { getFunctions } from "firebase/functions";
const { FIREBASE_CONFIG } = config;

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();

firebase.analytics();
export const analytics = getAnalytics();
export const db = app.firestore();
export const storage = app.storage();
export const auth = app.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const functions = getFunctions(app);
