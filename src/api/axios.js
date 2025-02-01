import axios from "axios";

const instance = axios.create({
  baseURL: "https://alicante.onrender.com/api",
  withCredentials: true,
});

export default instance;
