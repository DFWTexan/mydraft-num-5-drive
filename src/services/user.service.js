import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:8080/api/test/";
// import { API_URL } from "../config";

const getPublicContent = () => {
  return axios.get(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "all");
};

const getUserBoard = () => {
  return axios.get(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(process.env.REACT_APP_MYDRAFT_API_BASE_URL + "admin", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default userService