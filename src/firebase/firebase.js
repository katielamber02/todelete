//https://www.youtube.com/watch?v=zq0TuNqV0Ew

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5_iRW7uQGSHjg2SgqdyV_XK2wSPCdiPU",
  authDomain: "trainingcafefirebase.firebaseapp.com",
  databaseURL: "https://trainingcafefirebase.firebaseio.com",
  projectId: "trainingcafefirebase",
  storageBucket: "trainingcafefirebase.appspot.com",
  messagingSenderId: "1005309788595",
  appId: "1:1005309788595:web:516ad825e3148500"
};
firebase.initializeApp(firebaseConfig);

export default firebase;

export const db = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage();
