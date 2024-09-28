"use client";

// import UnAuthorizedHeader from "@/components/header";
import styles from "./layout.module.css";

export default function PreLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      {/* <UnAuthorizedHeader /> */}
      {children}
    </div>
  );
}
