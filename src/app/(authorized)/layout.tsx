"use client";

import axios from "axios";
import styles from "./layout.module.css";
import { getCookie } from "@/utils/cookie";
import { useEffect, useState } from "react";
import { Friend } from "@/types";
import AuthorizedAside from "@/components/aside";
import { axiosInstance } from "@/utils/axios";

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [friends, setFriends] = useState<Friend[]>([]);

  const getFriends = async () => {
    try {
      const response = await axiosInstance.get("/users/me/friends");
      const data = await response.data;
      console.log(data);
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className={styles.container}>
      <AuthorizedAside friends={friends} />
      {children}
    </div>
  );
}
