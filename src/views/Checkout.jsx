import React, { useEffect } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";

import CheckoutForm from "./CheckoutForm";
import { Redirect } from "react-router-dom";

export default function Checkout({ clearCart, history, totalPrice }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // if (totalPrice === 0) return <Redirect to="/" />;
  // const totalPrice = history.location.state.totalPrice;

  return (
    <>
      <h3 className="font-weight-lighter">Checkout</h3>
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK}>
        <Elements>
          <CheckoutForm clearCart={clearCart} history={history} totalPrice={totalPrice} />
        </Elements>
      </StripeProvider>
    </>
  );
}
