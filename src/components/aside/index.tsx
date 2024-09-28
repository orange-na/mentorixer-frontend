"use client";

import Link from "next/link";
import styles from "./index.module.css";
import { Friend } from "@/types";
import { IoPersonAddOutline } from "react-icons/io5";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";

export type AuthorizedAsideProps = {
  friends: Friend[];
  selectedFriendId?: string;
};

export default function AuthorizedAside(props: AuthorizedAsideProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.icon}>
          <TbLayoutSidebarRightExpand size={20} />
        </div>
        <Link href="/friends/create" className={styles.icon}>
          <IoPersonAddOutline color="" size={20} />
        </Link>
      </div>
      <ul className={styles.friendList}>
        {props.friends.map((friend) => (
          <li
            key={friend.id}
            className={
              props.selectedFriendId === friend.id.toString()
                ? styles.selected
                : ""
            }
          >
            <Link href={`/friends/${friend.id}`}> {friend.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
