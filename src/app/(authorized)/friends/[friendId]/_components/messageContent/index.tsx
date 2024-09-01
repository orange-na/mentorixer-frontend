import { Message } from "@/types";
import styles from "./index.module.css";

type MessageContentProps = {
  messages: Message[];
};

export default function MessageContent({ messages }: MessageContentProps) {
  return (
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
  );
}
