import http from "./httpService";
import JWTDecode from "jwt-decode";
const apiUrl = process.env.REACT_APP_API_URL;

export const signup = (user) => http.post(`${apiUrl}/users/register`, user);

export const login = async (user) => {
  const {
    data: { token },
  } = await http.post(`${apiUrl}/users/login`, user);
  localStorage.setItem("token", token);
  http.updateAxiosJWT(); // Update Axios headers after login
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    return JWTDecode(token);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  http.updateAxiosJWT();
  return (window.location = "/");
};

export async function forgotPassword(email) {
  return await http.post(`${apiUrl}/users/forgotpassword`, { email });
}

export async function resetPassword(password, resetPasswordToken) {
  const actualToken =
    resetPasswordToken.resetPasswordToken || resetPasswordToken;

  const response = await http.post(`${apiUrl}/users/reset-password`, {
    password,
    resetPasswordToken: actualToken,
  });

  return response.data.message;
}

export const getJWT = () => localStorage.getItem("token");
