import React from "react";
import Button from "./Button";

export default function Product({ data, handleButtonClick }) {
  return (
    <div className="card mb-4 col-md-3" style={{ cursor: "pointer" }}>
      <img src={data.image} className="card-img-top" alt={data.id} />
      <div className="card-body">
        <p className="card-title">{data.title}</p>
        <h4>{`₦${data.price}`}</h4>
        {/* <p className="card-text">{data.description.substring(0, 100)}</p> */}
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
        <Button name="Add to cart" onClick={() => handleButtonClick([1, 2])} />
      </div>
    </div>
  );
}
