"use client";

import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await axios.post(
        "http://localhost:8080/sign-up",
        Object.fromEntries(formData)
      );
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
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

        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
