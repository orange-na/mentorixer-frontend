import { cookies } from "next/headers";
import axios from "axios";

export async function isAuthenticated(): Promise<boolean> {
  try {
    const token = cookies().get("token")?.value;
    const response = await axios.get("http://localhost:8080/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
}
