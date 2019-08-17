//https://www.youtube.com/watch?v=zq0TuNqV0Ew

import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const firebaseConfig = {
  apiKey: "AIzaSyAUbI-9ajnApqXfa_vWuZ9keRWrYVo9c5s",
  authDomain: "thenetninja-auth.firebaseapp.com",
  databaseURL: "https://thenetninja-auth.firebaseio.com",
  projectId: "thenetninja-auth",
  storageBucket: "thenetninja-auth.appspot.com",
  messagingSenderId: "969153230483",
  appId: "1:969153230483:web:6d4fb665111f2096"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
console.log(
  db
    .collection("cafes")
    .where("city", "==", "Lviv")
    .get()
    .then(snapshots => {
      snapshots.docs.forEach(doc => {
        console.log(doc.data(), "ID:", doc.id);
      });
    })
);
// db.collection("cafes").add({
//   name: "DogCafe",
//   city: "Lviv"
// });

//db.collection("cafes")
// .doc("3DDaq2DDwsOYQDtvIMdm")
// .update({ name: "New name" });
db.collection("cafes")
  .doc("3DDaq2DDwsOYQDtvIMdm")
  .delete();

export default class MyApp extends Component {
  state = {
    name: "",
    city: "",
    email: "",
    password: "",
    isSignedIn: false
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID, //+
      firebase.auth.PhoneAuthProvider.PROVIDER_ID //+
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  };
  handleChangeName = ev => {
    this.setState({
      name: ev.target.value
    });
  };
  handleChangeCity = ev => {
    this.setState({
      city: ev.target.value
    });
  };
  handleChangeEmail = ev => {
    this.setState({
      email: ev.target.value
    });
  };
  handleChangePassword = ev => {
    this.setState({
      password: ev.target.value
    });
  };
  render() {
    console.log(this.state.email);
    console.log(this.state.password);
    return (
      <div>
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
        <div>My App </div>
        <input
          type="text"
          placeholder="cafe name"
          value={this.state.name}
          onChange={this.handleChangeName}
        />

        <input
          type="text"
          placeholder="city"
          value={this.state.city}
          onChange={this.handleChangeCity}
        />
        <button onClick={this.onSubmit}>submit</button>

        <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleChangeEmail}
        />

        <input
          type="text"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChangePassword}
        />
        <button onClick={this.onSubmit}>submit</button>
      </div>
    );
  }
}
