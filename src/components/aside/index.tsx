"use client";

import Link from "next/link";
import styles from "./index.module.css";
import { Friend } from "@/types";

export type AuthorizedAsideProps = {
  friends: Friend[];
  selectedFriend?: Friend;
};

export default function AuthorizedAside(props: AuthorizedAsideProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.status}></div>
        <span>Create Friend</span>
      </div>
      <ul className={styles.friendList}>
        {props.friends.map((friend) => (
          <li
            key={friend.id}
            className={
              props.selectedFriend?.id === friend.id ? styles.selected : ""
            }
          >
            {friend.name}
          </li>
        ))}
      </ul>
      {/* <div className={styles.settings}>
        <div className={styles.accountSettings}>Account Settings</div>
        <div className={styles.notifications}>Notifications</div>
        <div className={styles.support}>Help & Support</div>
      </div> */}
    </aside>
  );
}
