import http from "../services/httpService";

const endPoint = "https://fakestoreapi.com/products";

const getProduct = () => {
  return http.get(endPoint);
};

export default {
  getProduct,
};
