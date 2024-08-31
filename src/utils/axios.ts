import Axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "./cookie";

export const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 10000,
});

const requestHandler = (request: InternalAxiosRequestConfig) => {
  const token = getCookie("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

axiosInstance.interceptors.request.use(requestHandler);
axiosInstance.interceptors.response.use(responseHandler);
