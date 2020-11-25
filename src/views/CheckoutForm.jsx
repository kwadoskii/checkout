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
  const [loading, setLoading] = useState(false);
  const [localTotalAmount, setLocalTotalAmount] = useState(totalPrice);
  const [receiptUrl, setReceiptUrl] = useState("");

  totalPrice = totalPrice.toLocaleString("en", {
    minimumFractionDigits: 2,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
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

    setLoading(false);
  };

  if (receiptUrl) {
    return (
      <div className="row">
        <div className="col-md-4 mr-auto ml-auto bg-white p-5 rounded card-shadow">
          <i className="fas fa-check-circle text-center my-4 success-logo "></i>
          <h3 className="font-weight-lighter text-center mt-4">Payment Successful!</h3>
          <p className="text-muted text-center mb-4">{`We've processed your payment of $${localTotalAmount}`}</p>
          <div className="row">
            <div className="ml-auto">
              <a href={receiptUrl} target="_blank">
                <Button name="View Receipt" classes="btn-sm btn-success mr-2" />
              </a>
            </div>
            <div className="mr-auto">
              <Link to="/">
                <Button name="Back to Store" classes="btn-sm btn-link" />
              </Link>
            </div>
          </div>
        </div>
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
            <CardNumberElement id="card-details" className="form-control" />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="exp">Expiration date</label>
            <CardExpiryElement id="exp" className="form-control" />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="cvc">CVC</label>
            <CardCVCElement id="cvc" className="form-control" />
          </div>
        </div>

        <Button
          className="btn-success col-md-6 offset-md-3 p-2 my-3"
          disabled={loading}
          name="pay"
          type="submit"
        />
      </form>
    </div>
  );
};

export default injectStripe(CheckoutForm);
