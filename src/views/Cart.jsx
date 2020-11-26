import React, { Fragment, useEffect } from "react";
import propTypes from "prop-types";

import Button from "../components/Button";
import formatCurrency from "../helpers/currencyFormatter";

export default function Cart({
  cart,
  clearCart,
  decreaseItem,
  history,
  increaseItem,
  removeFromCart,
  totalPrice,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ flex: 1 }} className="mb-5">
      <div className="container">
        <h3 className="font-weight-lighter text-center">My cart</h3>
        <div className="row">
          <div className="ml-auto pr-4">
            {cart.length > 1 && (
              <Button
                classes="btn-outline-danger"
                name="REMOVE ALL"
                onClick={() => clearCart()}
              />
            )}
          </div>
          <div className="col-md-12">
            {cart.map((c, i) => (
              <Fragment key={i}>
                <div className="bg-white my-4 p-3 rounded row card-shadow mx-2">
                  <div
                    className="col-md-2 cart-image"
                    style={{
                      background: `url(${c.image})`,
                    }}
                  ></div>

                  <div className="col-md-3">
                    <p className="mt-3 cart-title">{c.title}</p>
                    <Button
                      classes="btn-outline-danger"
                      name="REMOVE"
                      onClick={() => removeFromCart(c)}
                    />
                  </div>

                  <div className="col-md-3">
                    <div className="col-md-12  mt-1">
                      <Button
                        classes="btn-success"
                        disabled={c.quantity === 1 && true}
                        name="-"
                        onClick={() => decreaseItem(c)}
                      />
                      <p
                        className="badge badge-info mx-3"
                        style={{ fontSize: "initial" }}
                      >
                        {c.quantity}
                      </p>
                      <Button
                        classes="btn-success"
                        name="+"
                        onClick={() => increaseItem(c)}
                      />
                    </div>
                  </div>

                  <div className="col-md-2 mt-1 cart-unit-price">
                    <p>{formatCurrency(c.price)}</p>
                  </div>

                  <div className="col-md-2 mt-1 cart-unit-total">
                    <p>{formatCurrency(c.quantity * c.price)}</p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="ml-auto pr-2 my-3">
            <b style={{ fontSize: 18 }}>
              Total:{" "}
              <span className="cart-unit-total mx-2" style={{ fontSize: 22 }}>
                {formatCurrency(totalPrice)}
              </span>
            </b>
          </div>

          <div className="col-md-12">
            <Button
              classes="btn-warning col-md-3 offset-md-9"
              disabled={cart.length === 0 && true}
              name="CHECKOUT"
              onClick={() =>
                history.push({
                  pathname: "/checkout",
                  state: {
                    totalPrice: totalPrice.toLocaleString("en", {
                      minimumFractionDigits: 2,
                    }),
                  },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: propTypes.array,
  clearCart: propTypes.func,
  decreaseItem: propTypes.func,
  increaseItem: propTypes.func,
  removeFromCart: propTypes.func,
  totalPrice: propTypes.number,
};
