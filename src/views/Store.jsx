import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import productApi from "../services/productService";
import Product from "../components/Product";

export default function Store({ history, handleCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await productApi.getProduct();
      setProducts(data);
    };

    getProduct();
  }, []);

  return (
    <div
      className="row my-4"
      style={{ flexFlow: "row wrap", justifyContent: "space-evenly" }}
    >
      {products.map((product) => (
        <Product
          key={product.id}
          data={product}
          handleCart={() => {
            handleCart(product);
            toast.success("Added to cart", { autoClose: 2000, hideProgressBar: true });
          }}
        />
      ))}
    </div>
  );
}
