import axios from "axios";

import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected server error occurred.", { autoClose: false });
  }

  return Promise.reject(error);
});

const setJwt = (jwt) => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

export default {
  delete: axios.delete,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  setJwt,
};