import React, { Component } from "react";
import { auth, googleAuthProvider } from "../firebase/firebase";

export default class SignIn extends Component {
  render() {
    return (
      <div>
        SignIn
        <button
          onClick={() => {
            auth
              .signInWithPopup(googleAuthProvider)
              .then(function(result) {
                console.log(result.user.email);
              })
              .catch(function(error) {
                console.log(error);
                console.log("My error");
              });
          }}
        >
          sign in
        </button>
      </div>
    );
  }
}
