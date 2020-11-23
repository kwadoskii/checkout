import React, { Fragment } from "react";

import Button from "../components/Button";
import formatCurrency from "../helpers/currencyFormatter";

export default function Cart({
  cart,
  increaseItem,
  decreaseItem,
  history,
  removeFromCart,
  totalPrice,
}) {
  return (
    <div style={{ flex: 1 }}>
      <h3>Cart </h3>
      <div className="row">
        <div className="col-md-12">
          {cart.map((c, i) => (
            <Fragment key={i}>
              <div className="fa fa-times" onClick={() => removeFromCart(c)}></div>
              <p className="row">
                <span className="m-4 col-md-7">{c.title}</span>
                <span className="col-md-3 row">
                  <span className="m-4 col-md-5">Price: {c.price}</span>
                  <Button
                    disabled={c.quantity === 1 && true}
                    name="-"
                    onClick={() => decreaseItem(c)}
                  />
                  <span className="badge badge-info mx-3">{c.quantity}</span>
                  <Button name="+" onClick={() => increaseItem(c)} />
                </span>
                <span className="mx-3 col-md-1">
                  {formatCurrency(c.quantity * c.price)}
                </span>
              </p>
            </Fragment>
          ))}
        </div>

        <div className="col-md-2 offset-md-10">
          <p>Total: {formatCurrency(totalPrice)}</p>
        </div>

        <div className="col-md-12">
          <Button
            classes="btn-warning col-md-3 offset-md-9"
            disabled={cart.length === 0 && true}
            name="Checkout"
            onClick={() =>
              history.push({
                pathname: "/checkout",
                state: { totalPrice },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
