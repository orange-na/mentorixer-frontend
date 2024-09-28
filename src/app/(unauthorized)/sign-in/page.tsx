"use client";

import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookie/cookie-client";
import InputContainer from "@/components/inputContainer";
import InputText from "@/components/inputText";
import Button from "@/components/button";
import Link from "next/link";
import { signInSchema } from "./_schema/schema";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

export default function SignIn() {
  const router = useRouter();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signInSchema });
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
      const res = await axios.post(
        "http://localhost:8080/sign-in",
        Object.fromEntries(formData)
      );
      const token = res.data.token;
      setCookie("token", token, 10);
      router.push("/friends");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      <form {...getFormProps(form)} className={styles.form}>
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
          ログイン
        </Button>
        <p className={styles.signUp}>
          アカウントをお持ちでない方は
          <Link href="/sign-up" className={styles.signUpLink}>
            こちら
          </Link>
        </p>
      </form>
    </div>
  );
}
