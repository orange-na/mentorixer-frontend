import MessageContent from "./_components/messageContent";
import styles from "./page.module.css";

import { Friend, Message } from "@/types";
import { isAuthenticated } from "@/utils/authentication";
import { axiosServer } from "@/utils/axios/axios-server";
import { redirect } from "next/navigation";
import ChatInput from "./_components/sendInput";

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

    const messagesResponse = await axiosServer.get(
      `friends/${params.friendId}/messages`
    );
    messages = messagesResponse.data;
  } catch (error) {
    console.error(error);
  }

  const friendResponse = await axiosServer.get(
    `users/me/friends/${params.friendId}`
  );
  const friend = friendResponse.data;

  return (
    <div className={styles.chatPage}>
      <MessageContent messages={messages} friend={friend} />
      <ChatInput friendId={params.friendId} />
    </div>
  );
}
