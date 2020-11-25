import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
} from "react-stripe-elements";

import Button from "../components/Button";
import logger from "../services/logService";
import paymentApi from "../services/paymentService";

const CheckoutForm = ({ clearCart, history, stripe, totalPrice }) => {
  useEffect(() => {
    if (!totalPrice) history.push("/");
  }, []);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");

  totalPrice = totalPrice.toLocaleString("en", {
    minimumFractionDigits: 2,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { token } = await stripe.createToken();

      const { data } = await paymentApi.pay({
        amount: totalPrice.toString().replace(".", ""),
        source: token.id,
        receipt_email: email,
      });

      setReceiptUrl(data.charge.receipt_url);
      clearCart();
    } catch (error) {
      logger.log(error);
      console.log(error);
    }
  };

  if (receiptUrl) {
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a> | <Link to="/">Back to Store</Link>
      </div>
    );
  }

  return (
    <div className="checkout-form my-5">
      <h3 className="font-weight-lighter my-5 text-center">Amount Due: ${totalPrice}</h3>
      <form onSubmit={handleSubmit} className="col-md-6 ml-auto mr-auto">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              value={email}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="name">Full Name</label>
            <input
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              value={name}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="card-details">Card details</label>
            <CardNumberElement id="card-details" />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="exp">Expiration date</label>
            <CardExpiryElement id="exp" />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="cvc">CVC</label>
            <CardCVCElement id="cvc" />
          </div>
        </div>

        <Button
          className="btn-success col-md-6 offset-md-3 p-2 my-3 order-button"
          name="pay"
          type="submit"
        />
      </form>
    </div>
  );
};

export default injectStripe(CheckoutForm);
