import { Friend, Message } from "@/types";
import styles from "./index.module.css";

type MessageContentProps = {
  messages: Message[];
  friend: Friend;
};

export default function MessageContent({
  messages,
  friend,
}: MessageContentProps) {
  return (
    <>
      <div className={styles.header}>
        <p>{friend.name}</p>
        <p>{friend.mbti}</p>
        <p> {friend.age}歳</p>
      </div>

      <div className={styles.messageContent}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.userId ? styles.sent : styles.received
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
