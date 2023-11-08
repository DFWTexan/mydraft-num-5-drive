import axios from "axios";
import { API_URL } from "../config";


export default axios.create({
  // baseURL: "https://localhost:7242/api",
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});