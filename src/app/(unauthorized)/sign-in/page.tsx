"use client";

import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookie/cookie-client";

export default function SignIn() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const res = await axios.post(
        "http://localhost:8080/sign-in",
        Object.fromEntries(formData)
      );
      const token = res.data.token;
      setCookie("token", token, 10);
      router.push("/chat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          required
        />

        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
}
