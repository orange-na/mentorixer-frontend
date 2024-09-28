"use client";

import { axiosClient } from "@/utils/axios/axios-client";
import styles from "./index.module.css";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createFriendSchema } from "../../_schema/schema";
import InputText from "@/components/inputText";
import InputContainer from "@/components/inputContainer";
import Button from "@/components/button";

export default function CreateFriendForm() {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createFriendSchema });
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
      await axiosClient.post("/friends", Object.fromEntries(formData));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form {...getFormProps(form)} className={styles.form}>
      <InputContainer title="名前" errorMessage={fields.name.errors?.[0]}>
        <InputText
          name={fields.name.name}
          type="text"
          isError={!!fields.name.errors}
          placeholder="Ex. 岡本 太郎"
        />
      </InputContainer>

      <InputContainer title="MBTI" errorMessage={fields.mbti.errors?.[0]}>
        <InputText
          name={fields.mbti.name}
          type="text"
          isError={!!fields.mbti.errors}
          placeholder="Ex. INFP"
        />
      </InputContainer>

      <InputContainer title="年齢" errorMessage={fields.age.errors?.[0]}>
        <InputText
          name={fields.age.name}
          type="number"
          isError={!!fields.age.errors}
        />
      </InputContainer>

      <InputContainer title="性別" errorMessage={fields.gender.errors?.[0]}>
        <InputText
          name={fields.gender.name}
          type="text"
          isError={!!fields.age.errors}
        />
      </InputContainer>

      <InputContainer
        title="説明"
        errorMessage={fields.description.errors?.[0]}
      >
        <InputText
          name={fields.description.name}
          type="text"
          isError={!!fields.age.errors}
        />
      </InputContainer>

      <Button variant="primary" type="submit" marginTop={20}>
        登録
      </Button>
    </form>
  );
}
