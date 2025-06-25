import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Change if deployed to Vercel or other
});

export default API;
