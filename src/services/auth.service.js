import axios from "axios";

import { API_URL } from "../config";

// const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios
  .post(API_URL + "Authenticate/register", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "Authenticate/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
