import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Link href="sign-in" className={styles.button}>
          Sign In
        </Link>
        <Link href="/sign-up" className={styles.button}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
