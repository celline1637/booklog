import type { AxiosInstance } from "axios";
import axios from "axios";

// --------------------------------------------------------

export const request: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
