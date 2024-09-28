"use client";

import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import InputContainer from "@/components/inputContainer";
import InputText from "@/components/inputText";
import Button from "@/components/button";
import { getFormProps, useForm } from "@conform-to/react";
import { signUpSchema } from "./_schema/schema";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpSchema });
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
      await axios.post(
        "http://localhost:8080/sign-up",
        Object.fromEntries(formData)
      );
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>新規登録</h1>
      <form {...getFormProps(form)} className={styles.form}>
        <InputContainer title="名前" errorMessage={fields.name.errors?.[0]}>
          <InputText
            name={fields.name.name}
            type="text"
            isError={!!fields.name.errors}
            placeholder="Ex. 岡本 太郎"
          />
        </InputContainer>

        <InputContainer
          title="メールアドレス"
          errorMessage={fields.email.errors?.[0]}
        >
          <InputText
            name={fields.email.name}
            type="email"
            isError={!!fields.email.errors}
            placeholder="example@example.com"
          />
        </InputContainer>

        <InputContainer
          title="パスワード"
          errorMessage={fields.password.errors?.[0]}
        >
          <InputText
            name={fields.password.name}
            type="password"
            isError={!!fields.password.errors}
          />
        </InputContainer>

        <Button variant="primary" type="submit" marginTop={20}>
          登録
        </Button>
        <p className={styles.signIn}>
          既にアカウントをお持ちの方は
          <Link href="/sign-in" className={styles.signInLink}>
            こちら
          </Link>
        </p>
      </form>
    </div>
  );
}
