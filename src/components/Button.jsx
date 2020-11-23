import React from "react";

export default function Button({ name, onClick, classes = "" }) {
  classes = !classes ? "btn btn-success col-md-12" : "btn col-md-12" + classes;

  return (
    <button className={classes} onClick={onClick}>
      {name}
    </button>
  );
}
