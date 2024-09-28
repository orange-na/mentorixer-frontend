"use client";

import Link from "next/link";
import styles from "./index.module.css";
import { Friend } from "@/types";
import { IoPersonAddOutline } from "react-icons/io5";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { axiosClient } from "@/utils/axios/axios-client";
import { useRouter } from "next/navigation";

export type AuthorizedAsideProps = {
  friends: Friend[];
  selectedFriendId?: string;
  closeAside: () => void;
};

export default function AuthorizedAside(props: AuthorizedAsideProps) {
  const router = useRouter();
  const [friendMenuId, setFriendMenuId] = useState<number | null>(null);

  async function handleDeleteFriend(friendId: number) {
    try {
      await axiosClient.delete(`/friends/${friendId}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.icon} onClick={props.closeAside}>
          <TbLayoutSidebarRightExpand size={20} />
        </div>
        <Link href="/friends/create" className={styles.icon}>
          <IoPersonAddOutline size={20} />
        </Link>
      </div>

      <ul className={styles.friendList}>
        {props.friends.map((friend) => (
          <li
            key={friend.id}
            onClick={() => router.push(`/friends/${friend.id}`)}
            className={
              props.selectedFriendId === friend.id.toString()
                ? styles.selected
                : ""
            }
          >
            <p>{friend.name}</p>
            <BsThreeDots
              className={styles.menuButton}
              onClick={() => setFriendMenuId(friend.id)}
            />
            {friendMenuId === friend.id && (
              <div
                className={styles.friendMenu}
                onMouseLeave={() => setFriendMenuId(null)}
              >
                <div className={styles.friendMenuItem}>
                  <FaRegEdit className={styles.menuIcon} />
                  <Link href={`/friends/${friend.id}/edit`}>編集</Link>
                </div>
                <div
                  className={styles.friendMenuDelete}
                  onClick={() => handleDeleteFriend(friend.id)}
                >
                  <MdDeleteOutline className={styles.menuIcon} />
                  <p>削除</p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
