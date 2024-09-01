"use server";

import { cookies } from "next/headers";

export async function getServerCookie(name: string) {
  const cookie = cookies().get(name);
  return cookie ? cookie.value : "";
}
