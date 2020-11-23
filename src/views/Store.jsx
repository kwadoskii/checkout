import React, { useState, useEffect } from "react";

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
    <div className="row my-4">
      {products.map((product) => (
        <Product key={product.id} data={product} handleButtonClick={handleCart} />
      ))}
    </div>
  );
}
