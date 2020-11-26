import React from "react";
import propTypes from "prop-types";

export default function Button({ name, onClick, classes = "", ...otherProps }) {
  classes = !classes ? "btn btn-success my-2" : "btn my-2 " + classes;

  return (
    <button className={classes} onClick={onClick} {...otherProps}>
      {name}
    </button>
  );
}

Button.propTypes = {
  classes: propTypes.string,
  name: propTypes.string,
  onClick: propTypes.func,
};
