"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { axiosClient } from "@/utils/axios/axios-client";

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
  { id: 1, friendId: 1, content: "Hey, how are you?" },
  { id: 2, friendId: 1, content: "I'm good, thanks! How about you?" },
  { id: 3, friendId: 2, content: "What are you up to today?" },
];

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);

  const handleFriendClick = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  const gedFriends = async () => {
    try {
      const response = await axiosClient.get("/users/me/friends");
      const data = await response.data;
      // console.log(data);
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gedFriends();
  }, []);

  console.log(process.env.NODE_ENV);

  return (
    <div className={styles.chatPage}>
      <header className={styles.header}>
        <h1>Chat App</h1>
        <Link href="/friends/create">Create Friend</Link>
      </header>
      <div className={styles.content}>
        <aside className={styles.friendList}>
          <h2>Friends</h2>
          <ul>
            {friends.map((friend, index) => (
              <li
                key={index}
                onClick={() => handleFriendClick(friend)}
                className={
                  selectedFriend?.ID === friend.ID ? styles.selected : ""
                }
              >
                {friend.Name}
              </li>
            ))}
          </ul>
        </aside>
        <main className={styles.chatArea}>
          {selectedFriend ? (
            <>
              <h2>Chat with {selectedFriend.Name}</h2>
              <ul className={styles.messageList}>
                {messages
                  .filter((message) => message.friendId === selectedFriend.ID)
                  .map((message) => (
                    <li key={message.id}>{message.content}</li>
                  ))}
              </ul>
            </>
          ) : (
            <p>Select a friend to start chatting.</p>
          )}
        </main>
      </div>
    </div>
  );
}
