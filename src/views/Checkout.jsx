import React, { useEffect } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import propTypes from "prop-types";

import CheckoutForm from "./CheckoutForm";

export default function Checkout({ clearCart, history, totalPrice }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h3 className="font-weight-lighter text-center">Checkout</h3>
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK}>
        <Elements>
          <CheckoutForm clearCart={clearCart} history={history} totalPrice={totalPrice} />
        </Elements>
      </StripeProvider>
    </>
  );
}

Checkout.propTypes = {
  clearCart: propTypes.func,
  history: propTypes.object,
  totalPrice: propTypes.number,
};
