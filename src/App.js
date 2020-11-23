import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, Bounce as Flip } from "react-toastify";

import Cart from "./views/Cart";
import Navbar from "./components/Navbar";
import Store from "./views/Store";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./views/NotFound";

function App() {
  const [cart, setCart] = useState([]);

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
        <main className="container py-2 mr-auto ml-auto">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <Store {...props} handleCart={setCart} />}
            />
            <Route path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
