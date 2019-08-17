import Cafe from "./Cafe";
import React from "react";
import map from "lodash/map";
import { db } from "../firebase/firebase";

export default function Cafes(props) {
  function handleSelect(key) {
    db.ref("/cafes")
      .child(key)
      .child("votes")
      .child(props.user.uid)
      .set(props.user.displayName);
  }
  function handleDeselect(key) {
    //console.log("User DESELECT", props.user.uid);
    db.ref("/cafes")
      .child(key)
      .child("votes")
      .child(props.user.uid)
      .remove();
  }
  return (
    <div>
      {map(props.cafes, (cafe, key) => {
        console.log("KEY:", key);
        return (
          <Cafe
            cafe={cafe}
            key={key}
            handleSelect={() => handleSelect(key)}
            handleDeselect={() => handleDeselect(key)}
          />
        );
      })}
    </div>
  );
}
