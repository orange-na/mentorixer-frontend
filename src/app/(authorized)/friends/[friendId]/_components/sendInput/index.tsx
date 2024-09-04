"use client";

import { axiosClient } from "@/utils/axios/axios-client";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type ChatInputProps = {
  friendId: string;
};

export default function ChatInput(props: ChatInputProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const res = await axiosClient.post(
        `/friends/${props.friendId}/messages`,
        Object.fromEntries(formData)
      );
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      router.refresh();

      //   await axiosClient.post(`/api/gimini`, {
      //     content: res.data.content,
      //   });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.chatInput} onSubmit={handleSubmit}>
      <input
        type="text"
        name="content"
        placeholder="Type your message..."
        ref={inputRef}
      />
      <button>Send</button>
    </form>
  );
}
