import http from "../services/httpService";

const endPoint = "http://localhost:7000/api/stripe/charge";

const pay = (details) => {
  return http.post(endPoint, details);
};

export default {
  pay,
};
