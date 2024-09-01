import MessageContent from "./_components/messageContent";
import styles from "./page.module.css";

import { Message } from "@/types";
import { isAuthenticated } from "@/utils/authentication";
import { axiosServer } from "@/utils/axios/axios-server";
import { redirect } from "next/navigation";
import ChatInput from "./_components/sendInput";

export const mockMessages: Message[] = [
  {
    id: 1,
    roomId: 1,
    userId: 1,
    content: "Hello, how are you?",
    createdAt: new Date("2023-06-01T10:00:00"),
    updatedAt: new Date("2023-06-01T10:00:00"),
  },
  {
    id: 2,
    roomId: 1,
    friendId: 2,
    content: "I'm doing well, thanks for asking!",
    createdAt: new Date("2023-06-01T10:05:00"),
    updatedAt: new Date("2023-06-01T10:05:00"),
  },
  {
    id: 3,
    roomId: 1,
    userId: 1,
    content: "That's great to hear. How was your weekend?",
    createdAt: new Date("2023-06-01T10:10:00"),
    updatedAt: new Date("2023-06-01T10:10:00"),
  },
  {
    id: 4,
    roomId: 1,
    friendId: 2,
    content: "It was nice and relaxing. I went on a hike with some friends.",
    createdAt: new Date("2023-06-01T10:15:00"),
    updatedAt: new Date("2023-06-01T10:15:00"),
  },
  {
    id: 5,
    roomId: 1,
    userId: 1,
    content: "That sounds like a lot of fun! I love hiking.",
    createdAt: new Date("2023-06-01T10:20:00"),
    updatedAt: new Date("2023-06-01T10:20:00"),
  },
  {
    id: 6,
    roomId: 1,
    friendId: 2,
    content: "Yeah, it's a great way to get some exercise and enjoy nature.",
    createdAt: new Date("2023-06-01T10:25:00"),
    updatedAt: new Date("2023-06-01T10:25:00"),
  },
  {
    id: 7,
    roomId: 1,
    userId: 1,
    content: "Definitely! We should go on a hike together sometime.",
    createdAt: new Date("2023-06-01T10:30:00"),
    updatedAt: new Date("2023-06-01T10:30:00"),
  },
  {
    id: 8,
    roomId: 1,
    friendId: 2,
    content: "That would be awesome! Let's plan something soon.",
    createdAt: new Date("2023-06-01T10:35:00"),
    updatedAt: new Date("2023-06-01T10:35:00"),
  },
  {
    id: 9,
    roomId: 1,
    userId: 1,
    content: "Sounds good. I'll check my schedule and get back to you.",
    createdAt: new Date("2023-06-01T10:40:00"),
    updatedAt: new Date("2023-06-01T10:40:00"),
  },
  {
    id: 10,
    roomId: 1,
    friendId: 2,
    content: "Perfect! Looking forward to it.",
    createdAt: new Date("2023-06-01T10:45:00"),
    updatedAt: new Date("2023-06-01T10:45:00"),
  },
];

export default async function ChatPage({
  params,
}: {
  params: { friendId: string };
}) {
  let messages: Message[] = [];
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      redirect("/sign-in");
    }

    const res = await axiosServer.get(`friends/${params.friendId}/messages`);
    messages = res.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className={styles.chatPage}>
      <MessageContent messages={messages} />
      <ChatInput friendId={params.friendId} />
    </div>
  );
}
