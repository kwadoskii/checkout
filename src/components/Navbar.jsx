import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export default function Navbar({ cartLength }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <Link to="/" className="navbar-brand">
        Store R Us
      </Link>

      <Link className="ml-auto text-muted" style={{ fontSize: "1.4em" }} to="/cart">
        <i className="fas fa-shopping-cart"></i>
        <span className="badge badge-pill badge-success" style={{ fontSize: "0.6em" }}>
          {cartLength}
        </span>
      </Link>
    </nav>
  );
}

Navbar.propTypes = {
  cartLength: propTypes.number,
};
