const key = "cart";

const getLocalCart =
  JSON.parse(localStorage.getItem(key)) === null
    ? []
    : JSON.parse(localStorage.getItem(key));

const setLocalCart = (newCart, func) => {
  localStorage.setItem("cart", JSON.stringify(newCart));
  func(newCart);
};

export default {
  getLocalCart,
  setLocalCart,
};
