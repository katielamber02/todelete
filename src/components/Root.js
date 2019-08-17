import React from "react";

var arr = [];

for (let i = 0; i < 5; i++) {
  arr[i] = function() {
    console.log("i=", i);
  };

  console.log(arr);
}
for (let j = 0; j < 5; j++) {
  arr[j]();
}

var g = "G";
export default function Root() {
  function f1(a) {
    var c = "C";
    return function f2(b) {
      console.log(a, b, c, g);
    };
  }
  var func = f1("A");
  func("B");
  return (
    <div>
      Root
      <button onClick={() => func(+new Date())}>date</button>
    </div>
  );
}
