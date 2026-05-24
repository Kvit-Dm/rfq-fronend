import axios from "axios";

/** Public Strapi API — no auth on this frontend. */
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});