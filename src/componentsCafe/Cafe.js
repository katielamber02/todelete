import React from "react";
import map from "lodash/map";
//import Profile from "./Profile";

export default function Cafe(props) {
  console.log("VOTES:", map(props.cafe.votes));

  return (
    <div>
      <h1>{props.cafe.name}</h1>
      <button onClick={props.handleSelect}>Yes</button>
      <button onClick={props.handleDeselect}>No</button>
      <h4>
        VOTES:(
        <span style={{ color: "red" }}>{map(props.cafe.votes).length}</span>)
      </h4>
      <ul>
        {props.cafe.votes &&
          map(props.cafe.votes, (vote, key) => {
            return <li key={key}>{vote}</li>;
          })}
      </ul>
    </div>
  );
}
