import React from "react";

export default function Button({ name, onClick, classes = "", ...otherProps }) {
  classes = !classes ? "btn btn-success my-2" : "btn my-2 " + classes;

  return (
    <button className={classes} onClick={onClick} {...otherProps}>
      {name.toUpperCase()}
    </button>
  );
}
