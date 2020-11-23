import React from "react";

export default function Checkout({ location }) {
  return (
    <>
      <h2>Checkout</h2>
      <p>{location.state.totalPrice}</p>
    </>
  );
}
