import axios from "axios";
import { setupInterceptorsTo } from "./interceptor";

const Axios = setupInterceptorsTo(
  axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_URL,
    timeout: 10 * 1000, // milliseconds
    headers: { "Content-Type": "application/json", Authorization: "token 499bcf5eaae520ea7d874186121055bee6606466" },
  })
);

export default Axios;
