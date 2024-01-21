import axios from "axios";
import { toast } from "react-toastify";
import { getJWT } from "./userService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function setJWT() {
  const jwt = getJWT();
  if (jwt) axios.defaults.headers.common["x-auth-token"] = jwt;
}

setJWT();

axios.interceptors.request.use(
  (config) => {
    console.debug("Request:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.data && response.data.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status >= 400) {
      toast.error(`An error occurred: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJWT,
};

export default http;
