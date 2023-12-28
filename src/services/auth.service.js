// import axios from "axios";
// import { API_URL } from "../config";
const axios = require("axios");

const register = (username, email, password) => {
  return axios
  .post(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "Authenticate/register", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "Authenticate/login", {
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
