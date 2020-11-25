import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">
          <i className="fas fa-binoculars"></i> Not Found!
        </h1>
        <p className="lead">
          Sorry you are lost, go <Link to="/">Home.</Link>
        </p>
      </div>
    </div>
  );
}
