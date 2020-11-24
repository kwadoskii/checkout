import React from "react";

export default function Checkout({ location }) {
  return (
    <>
      <h2>Checkout</h2>
      <p>{location.state.totalPrice}</p>
      {/* <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}
    </>
  );
}
