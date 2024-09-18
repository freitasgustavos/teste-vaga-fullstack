import axios from "axios";

export const upload = axios.create({
  baseURL: import.meta.env.VITE_UPLOAD_URL,
});
