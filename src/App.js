import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, Bounce as Flip } from "react-toastify";

import cache from "./services/cacheService";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Navbar from "./components/Navbar";
import NotFound from "./views/NotFound";
import Store from "./views/Store";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState([]);

  const increaseItem = (product) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((p) => {
      if (p.id === product.id) {
        p.quantity++;
      }
      return p;
    });

    cache.setLocalCart(newCart, setCart);
  };

  const decreaseItem = (product) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((p) => {
      if (p.quantity === 1) return p; //stops cart item from becoming empty

      if (p.id === product.id) {
        p.quantity--;
      }
      return p;
    });

    cache.setLocalCart(newCart, setCart);
  };

  const addToCart = (product) => {
    const newCart = [...cart];
    if (!product.quantity) {
      product.quantity = 1;
      newCart.push(product);
    } else {
      product.quantity++;
    }

    cache.setLocalCart(newCart, setCart);
  };

  const removeFromCart = (product) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((p) => p.id !== product.id);
    cache.setLocalCart(newCart, setCart);
  };

  const totalPrice = () => {
    const newCart = [...cart];
    let subTotal = 0;
    newCart.forEach((cart) => {
      subTotal += cart.price * cart.quantity;
    });
    return subTotal;
  };

  useEffect(() => {
    setCart(cache.getLocalCart);
  }, []);

  return (
    <>
      <ToastContainer
        autoClose={4500}
        closeOnClick={false}
        draggable
        hideProgressBar={false}
        limit={3}
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover={false}
        position="bottom-left"
        rtl={false}
        transition={Flip}
      />

      <BrowserRouter>
        <Navbar cart={cart.length} />
        <main className="container-fluid px-3 bg-light py-2">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <Store {...props} handleCart={addToCart} />}
            />
            <Route
              path="/cart"
              render={(props) => (
                <Cart
                  {...props}
                  cart={cart}
                  decreaseItem={decreaseItem}
                  increaseItem={increaseItem}
                  removeFromCart={removeFromCart}
                  totalPrice={totalPrice()}
                />
              )}
            />
            <Route path="/checkout" component={Checkout} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
