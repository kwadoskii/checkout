import http from "../services/httpService";

const endPoint = "https://fathomless-refuge-58102.herokuapp.com/api/stripe/charge";

const pay = (details) => {
  return http.post(endPoint, details);
};

export default {
  pay,
};
