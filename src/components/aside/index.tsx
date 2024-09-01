"use client";

import Link from "next/link";
import styles from "./index.module.css";
import { Friend } from "@/types";

export type AuthorizedAsideProps = {
  friends: Friend[];
  selectedFriendId?: string;
};

export default function AuthorizedAside(props: AuthorizedAsideProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <Link href="/friends/create" className={styles.createFriendButton}>
          Create Friend
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
