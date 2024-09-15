"use client";

import { axiosClient } from "@/utils/axios/axios-client";
import styles from "./page.module.css";

export default function CreateFriend() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await axiosClient.post("/friends", Object.fromEntries(formData));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register Friend</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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

        <label htmlFor="mbti" className={styles.label}>
          MBTI:
        </label>
        <input
          type="text"
          id="mbti"
          name="mbti"
          className={styles.input}
          required
        />

        <label htmlFor="age" className={styles.label}>
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          className={styles.input}
          required
        />

        <label htmlFor="gender" className={styles.label}>
          Gender:
        </label>
        <input
          type="text"
          id="gender"
          name="gender"
          className={styles.input}
          required
        />

        <label htmlFor="description" className={styles.label}>
          description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}
