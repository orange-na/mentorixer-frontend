"use client";

import { axiosClient } from "@/utils/axios/axios-client";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoSend } from "react-icons/io5";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { sendContentSchema } from "../../_schema/schema";

type ChatInputProps = {
  friendId: string;
};

export default function ChatInput(props: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: sendContentSchema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    onSubmit(event, { formData }) {
      event.preventDefault();
      handleSubmit(formData);
    },
  });

  const handleSubmit = async (formData: FormData) => {
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
      <form {...getFormProps(form)} className={styles.form}>
        <input
          type="text"
          name={fields.content.name}
          placeholder="Type your message..."
          ref={inputRef}
        />

        <button disabled={!fields.content.dirty}>
          <IoSend
            size={20}
            style={fields.content.dirty ? {} : { color: "#ffffff50" }}
          />
        </button>
      </form>
    </div>
  );
}
