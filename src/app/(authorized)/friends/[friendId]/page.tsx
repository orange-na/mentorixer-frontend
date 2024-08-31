"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { getCookie } from "@/utils/cookie";
import Link from "next/link";

type Friend = {
  ID: number;
  Name: string;
};

type Message = {
  id: number;
  friendId: number;
  content: string;
};

const messages: Message[] = [
  { id: 1, friendId: 1, content: "Hey, did you see the new proposal?" },
  { id: 2, friendId: 1, content: "Yes, I reviewed it and have some feedback." },
  {
    id: 3,
    friendId: 2,
    content: "Great, let's discuss the feedback in our next meeting.",
  },
];

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [friends, setFriends] = useState<Friend[]>([
    { ID: 1, Name: "Jane Smith" },
    { ID: 2, Name: "Michael Johnson" },
    { ID: 3, Name: "Sarah Lee" },
  ]);

  const handleFriendClick = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className={styles.chatPage}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.status}></div>
          <span>John Doe</span>
        </div>
        <ul className={styles.friendList}>
          {friends.map((friend, index) => (
            <li
              key={index}
              onClick={() => handleFriendClick(friend)}
              className={
                selectedFriend?.ID === friend.ID ? styles.selected : ""
              }
            >
              <div className={styles.status}></div>
              {friend.Name}
            </li>
          ))}
        </ul>
        <div className={styles.settings}>
          <div className={styles.accountSettings}>Account Settings</div>
          <div className={styles.notifications}>Notifications</div>
          <div className={styles.support}>Help & Support</div>
        </div>
      </aside>
      <main className={styles.chatArea}>
        <div className={styles.projectDetails}></div>

        <div className={styles.chatHistory}>
          {selectedFriend && (
            <>
              <h2>Chat with {selectedFriend.Name}</h2>
              {/* <ul className={styles.messageList}>
                {messages
                  .filter((message) => message.friendId === selectedFriend.ID)
                  .map((message) => (
                    <li key={message.id}>{message.content}</li>
                  ))}
              </ul> */}
            </>
          )}
        </div>
        <div className={styles.chatInput}>
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </main>
    </div>
  );
}
