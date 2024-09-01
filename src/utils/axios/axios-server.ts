"use server";

import Axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getServerCookie } from "../cookie/cookie-server";

const TIME_OUT = 10000;

export const axiosServer = Axios.create({
  baseURL: process.env.API_ENDPOINT,
  timeout: TIME_OUT,
});

const requestHandler = (request: InternalAxiosRequestConfig) => {
  const token = getServerCookie("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

axiosServer.interceptors.request.use(requestHandler);
axiosServer.interceptors.response.use(responseHandler);
