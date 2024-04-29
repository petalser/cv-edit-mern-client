import axios from "axios";
const baseURL = "http://localhost:1234";

export default axios.create({
  baseURL,
});

export const privateAxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
