"use client";

import styles from "./layout.module.css";
import { useEffect, useState } from "react";
import { Friend } from "@/types";
import AuthorizedAside from "@/components/aside";
import { useParams } from "next/navigation";
import { axiosClient } from "@/utils/axios/axios-client";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);

  function openAside() {
    setIsAsideOpen(true);
  }

  function closeAside() {
    setIsAsideOpen(false);
  }

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

  return (
    <div className={styles.container}>
      {isAsideOpen ? (
        <div className={styles.aside}>
          <AuthorizedAside
            friends={friends}
            selectedFriendId={selectedFriendId}
            closeAside={closeAside}
          />
        </div>
      ) : (
        <div className={styles.closeAside} onClick={openAside}>
          <TbLayoutSidebarLeftExpand size={20} />
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
