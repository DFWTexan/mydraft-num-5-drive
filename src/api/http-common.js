import axios from "axios";
// import { API_URL } from "../config";


export default axios.create({
  // baseURL: "https://localhost:7242/api/",
  baseURL: process.env.REACT_APP_MYDRAFT_API_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});