import axios from "axios";
// import { API_URL } from "../config";
// const axios = require("axios").default;

const register = (username, email, password) => {
  return axios
  .post(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "Authenticate/register", {
    username,
    email,
    password,
  });
};

const registerV2 = (username, email, password) => {
  return axios
  .post(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "Authenticate/registerV2", {
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

const loginV2 = (email, password) => {
  return axios
    .post(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "Authenticate/loginV2", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const emailCodeConfirmation = (email, code) => {
  return axios
    .post(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "Authenticate/emailCodeConfirmation", {
      email,
      code,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  registerV2,
  login,
  loginV2,
  emailCodeConfirmation,
  logout,
};

export default authService;
