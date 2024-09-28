"use client";

import { axiosClient } from "@/utils/axios/axios-client";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoSend } from "react-icons/io5";

type ChatInputProps = {
  friendId: string;
};

export default function ChatInput(props: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

      await axiosClient.post(`/friends/${props.friendId}/api/gimini`, {
        content: res.data.content,
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.chatInput} onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          placeholder="Type your message..."
          ref={inputRef}
        />

        <button>
          <IoSend size={20} />
        </button>
      </form>
    </div>
  );
}
