"use server";

import { isAuthenticated } from "@/utils/authentication";
import { axiosServer } from "@/utils/axios/axios-server";
import { redirect } from "next/navigation";

export default async function Friends() {
  let data;
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      redirect("/sign-in");
    }

    const response = await axiosServer.get("/users/me/friends");
    data = await response.data;
  } catch (error) {
    console.log(error);
  }

  if (data.length > 0) {
    redirect(`/friends/${data[0].id}`);
  }
}
