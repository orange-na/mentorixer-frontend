"use server";

import { axiosServer } from "./axios/axios-server";

export async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await axiosServer.get("/users/me");

    return response.status === 200;
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
}
