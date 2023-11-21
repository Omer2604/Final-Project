import axios from "axios";
import { toast } from "react-toastify";
import { getJWT } from "./userService";

function updateAxiosJWT() {
  console.log("Debug: Calling updateAxiosJWT");

  const jwt = getJWT();
  console.log("Debug: JWT from getJWT:", jwt);

  console.log("Debug: Current Axios headers:", axios.defaults.headers.common);

  if (jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
    console.log("Debug: Setting Axios JWT Header", jwt); // Log when JWT is set
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    console.log("Debug: Deleting Axios JWT Header"); // Log when JWT is deleted
  }

  // Log updated Axios headers
  console.log("Debug: Updated Axios headers:", axios.defaults.headers.common);
}

// Call and log the initial configuration
console.log("Debug: Initial call to updateAxiosJWT");
updateAxiosJWT();

// Intercept requests to log headers
axios.interceptors.request.use((request) => {
  console.log("Debug: Axios headers before request:", request.headers);
  return request;
});

axios.interceptors.response.use((response) => {
  if (response.data && response.data.message) {
    toast.success(`Success: ${response.data.message}`);
  }
  console.log("Debug: Response Data:", response.data); // Log response data
  return response;
}, null);

axios.interceptors.request.use(
  (request) => {
    console.log("Starting Request:", JSON.stringify(request.headers, null, 2));
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor for logging error details
axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400;
  if (expectedError) {
    toast.error(`An error occurred: ${error.message}`);
    console.log("Debug: Sent Request:", JSON.stringify(error.config, null, 2)); // Detailed log
    console.log(
      "Debug: Error Data:",
      JSON.stringify(error.response.data, null, 2)
    ); // Detailed log
    console.log("Debug: Error Status:", error.response.status); // Log error status
    console.log(
      "Debug: Error Headers:",
      JSON.stringify(error.response.headers, null, 2)
    ); // Detailed log
  }
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  updateAxiosJWT,
};

export default http;
