import React, { Component } from "react";
import { auth, storage, db } from "../firebase/firebase";
//import FileInput from "react-file-input";

console.log(storage);

export default class Profile extends Component {
  constructor(props) {
    super(props);
    //console.log(props.uid);
    this.storageRef = storage.ref("/user-images").child(props.uid);
    this.userRef = db.ref("/users").child(props.uid);
  }

  handleChange = event => {
    let file = event.target.files[0];
    const uploadTask = this.storageRef
      .child(file.name)
      .put(file, { contentType: file.type });

    uploadTask.then(snapshot => {
      this.userRef.child("photoURL").set(snapshot.downloadURL);
      console.log(this.userRef.child("photoURL"));
      console.log(snapshot);
    });

    // uploadTask.on("state_changed", snapshot => {
    //   console.log(
    //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "%"
    //   );
    // }); //works fine

    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log("File available at", downloadURL);
    }); //this code doesn't work properly
  };

  render() {
    const { user, uid } = this.props;
    //console.log("user in profile:", user, uid);
    return (
      <div>
        {user && <button onClick={() => auth.signOut()}>Sign Out</button>}

        <article>
          <h1> Profile</h1>
          <h1>{user.displayName}</h1>
          <img
            src={user.photoURL}
            style={{ width: 80, height: 80 }}
            alt="Profile"
          />
        </article>
        <input type="file" name="file" onChange={e => this.handleChange(e)} />
      </div>
    );
  }
}
