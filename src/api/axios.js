import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

export default axios.create({
  baseURL,
});

export const privateAxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
