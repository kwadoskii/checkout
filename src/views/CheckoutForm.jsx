import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
} from "react-stripe-elements";
import propTypes from "prop-types";

import Button from "../components/Button";
import logger from "../services/logService";
import paymentApi from "../services/paymentService";

const CheckoutForm = ({ clearCart, history, stripe, totalPrice }) => {
  const [receiptUrl, setReceiptUrl] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [localTotalAmount] = useState(totalPrice);

  if (!totalPrice && receiptUrl === "") history.push("/");

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
      logger.init();
      logger.log(error);
    }

    setLoading(false);
  };

  if (receiptUrl) {
    return (
      <div className="row">
        <div className="col-md-4 mr-auto ml-auto bg-white p-5 rounded card-shadow">
          <i className="fas fa-check-circle text-center my-4 success-logo "></i>
          <h3 className="font-weight-lighter text-center mt-4">Payment Successful!</h3>
          <p className="text-muted text-center mb-4">{`We've processed your payment of $${localTotalAmount.toLocaleString(
            "en",
            {
              minimumFractionDigits: 2,
            }
          )}`}</p>
          <div className="row">
            <div className="ml-auto">
              <a href={receiptUrl} target="_blank" rel="noreferrer">
                <Button name="View Receipt" classes="btn-sm btn-success mr-2" />
              </a>
            </div>
            <div className="mr-auto">
              <Link to="/">
                <Button name="BACK TO STORE" classes="btn-sm btn-link" />
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
              placeholder="john.doe@example.com"
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
              placeholder="John Doe"
              type="text"
              required
              value={name}
            />
          </div>
        </div>

        <div className="form-row mt-3">
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

        <div className="form-row mt-3">
          <Button
            classes="btn-success col-md-6 offset-md-3 p-2 my-3"
            disabled={totalPrice > 0 && loading}
            name={
              !loading ? (
                "PAY"
              ) : (
                <>
                  Processing{" "}
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              )
            }
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default injectStripe(CheckoutForm);

CheckoutForm.propTypes = {
  clearCart: propTypes.func,
  totalPrice: propTypes.number,
};
