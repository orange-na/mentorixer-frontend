"use client";

import styles from "./layout.module.css";
import { useEffect, useState } from "react";
import { Friend } from "@/types";
import AuthorizedAside from "@/components/aside";
import { useParams } from "next/navigation";
import { axiosClient } from "@/utils/axios/axios-client";

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const [friends, setFriends] = useState<Friend[]>([]);

  const getFriends = async () => {
    try {
      const response = await axiosClient.get("/users/me/friends");
      const data = await response.data;
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedFriendId = params.friendId as string;

  useEffect(() => {
    getFriends();
  }, []);

  console.log(params.friendId);

  return (
    <div className={styles.container}>
      <div className={styles.aside}>
        <AuthorizedAside
          friends={friends}
          selectedFriendId={selectedFriendId}
        />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
