"use server";

import styles from "./page.module.css";
import CreateFriendForm from "./_components/form";

export default async function CreateFriend() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>フレンド登録</h1>
      <CreateFriendForm />
    </div>
  );
}
