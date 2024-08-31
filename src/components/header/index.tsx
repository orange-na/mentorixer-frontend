"use client";

import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";

export default function UnAuthorizedHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoContainer}>
        <Image
          src="/path/to/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className={styles.logo}
        />
      </Link>
      <div>アイコン</div>
    </header>
  );
}
