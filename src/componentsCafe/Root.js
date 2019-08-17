//https://www.youtube.com/watch?v=zq0TuNqV0Ew

import React, { Component } from "react";
import SignIn from "./SignIn";
import { auth, db } from "../firebase/firebase";
import Profile from "./Profile";
import Cafes from "./Cafes";
import pick from "lodash/pick";

const cafes = db.ref("/cafes");
const users = db.ref("/users");

export default class MyApp extends Component {
  state = {
    name: "",
    cafes: "",
    currentUser: "",
    users: {}
  };

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });

      cafes.on("value", snapshot => this.setState({ cafes: snapshot.val() }));

      if (currentUser) {
        this.userRef = users.child(currentUser.uid);
        this.userRef.once("value").then(snapshot => {
          if (snapshot.val()) return;

          const userData = pick(currentUser, [
            "displayName",
            "email",
            "photoURL"
          ]);
          this.userRef.set(userData);
        });
      }
      users.on("value", snapshot => this.setState({ users: snapshot.val() }));
    });
  }

  handleChangeName = ev => {
    this.setState({
      name: ev.target.value
    });
    console.log(this.state.name);
  };
  onSubmit = ev => {
    ev.preventDefault();
    console.log("submitted");
    cafes.push({ name: this.state.name });
  };

  render() {
    const { currentUser, cafes } = this.state;
    console.log("CAFES:", cafes);
    return (
      <div>
        <div>My App </div>
        {currentUser && <Profile user={currentUser} uid={currentUser.uid} />}
        {!currentUser && <SignIn />}
        <input
          type="text"
          placeholder="cafe name"
          value={this.state.name}
          onChange={this.handleChangeName}
        />
        <button onClick={this.onSubmit}>submit</button>
        CAFES:
        <Cafes cafes={cafes} user={currentUser} />
      </div>
    );
  }
}
