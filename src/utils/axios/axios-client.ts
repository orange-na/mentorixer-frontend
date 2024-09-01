import Axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getClientCookie } from "../cookie/cookie-client";

const TIME_OUT = 10000;

export const axiosClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: TIME_OUT,
});

const requestHandler = (request: InternalAxiosRequestConfig) => {
  const token = getClientCookie("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

axiosClient.interceptors.request.use(requestHandler);
axiosClient.interceptors.response.use(responseHandler);
