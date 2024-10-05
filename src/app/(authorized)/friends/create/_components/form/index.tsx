"use client";

import { axiosClient } from "@/utils/axios/axios-client";
import styles from "./index.module.css";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createFriendSchema } from "../../_schema/schema";
import InputText from "@/components/inputText";
import InputContainer from "@/components/inputContainer";
import Button from "@/components/button";
import InputTextarea from "@/components/inputTextarea";
import InputSelect from "@/components/inputSelect";
import { MBTI } from "@/utils/constant";
import { useRouter } from "next/navigation";

export default function CreateFriendForm() {
  const router = useRouter();
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
      const res = await axiosClient.post(
        "/friends",
        Object.fromEntries(formData)
      );
      router.push(`/friends/${res.data.id}`);
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
        <InputSelect
          name={fields.mbti.name}
          options={MBTI.map((value) => ({ value, label: value }))}
          selectedValue={fields.mbti.value}
          placeholder="選択"
          isError={!!fields.mbti.errors}
        />
      </InputContainer>

      <InputContainer title="年齢" errorMessage={fields.age.errors?.[0]}>
        <InputText
          name={fields.age.name}
          type="number"
          placeholder="Ex. 20"
          isError={!!fields.age.errors}
        />
      </InputContainer>

      <InputContainer title="性別" errorMessage={fields.gender.errors?.[0]}>
        <InputSelect
          name={fields.gender.name}
          options={[
            { value: "0", label: "男性" },
            { value: "1", label: "女性" },
            { value: "2", label: "その他" },
          ]}
          selectedValue={fields.gender.value}
          placeholder="選択"
          isError={!!fields.gender.errors}
        />
      </InputContainer>

      <InputContainer
        title="説明"
        errorMessage={fields.description.errors?.[0]}
      >
        <InputTextarea
          name={fields.description.name}
          isError={!!fields.age.errors}
          height={100}
        />
      </InputContainer>

      <Button variant="primary" type="submit" marginTop={20}>
        登録
      </Button>
    </form>
  );
}
