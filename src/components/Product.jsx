import React from "react";

import Button from "./Button";
import currencyFormatter from "../helpers/currencyFormatter";

export default function Product({ data, handleCart }) {
  return (
    <div className="card mb-5 col-md-4 col-sm-6" style={{ cursor: "pointer" }}>
      <div
        className="card-img-top"
        style={{
          background: `url(${data.image}) no-repeat center`,
          backgroundSize: "contain",
          height: 270,
          marginTop: 10,
        }}
      ></div>
      <span
        className="badge badge-warning p-2"
        style={{
          position: "absolute",
          top: "1%",
          right: "3%",
          textTransform: "capitalize",
        }}
      >
        {data.category}
      </span>
      <div className="card-body">
        <div>
          <p className="card-title">
            {data.title.length > 55 ? data.title.substring(0, 55) + "..." : data.title}
          </p>
          <h4>{currencyFormatter(data.price)}</h4>
          {/* <p className="card-text">{data.description.substring(0, 100)}</p> */}
        </div>

        <Button name="Add to cart" onClick={handleCart} />
      </div>
    </div>
  );
}
