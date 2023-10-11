import axios, { AxiosInstance } from "axios";

const { NODE_ENV } = process.env;

axios.defaults.timeout = 5000;
axios.defaults.headers.common[
  "x-api-key"
] = `${process.env.NEXT_PUBLIC_OPENSEA_API_KEY}`;

axios.interceptors.request.use((req) => {
  if (NODE_ENV !== "production") {
    const { method, url, params, data } = req;
    console.info({ method, url, params, data });
  }
  return req;
});

axios.interceptors.response.use((res) => {
  if (NODE_ENV !== "production") {
    const { status, statusText, data } = res;
    console.info({ status, statusText, data });
  }
  return res;
});

const request: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default request;
