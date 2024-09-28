import styles from "./page.module.css";
import LinkButton from "@/components/linkButton";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <LinkButton href="/sign-up" variant="primary">
          新規登録
        </LinkButton>
        <LinkButton href="/sign-in" variant="primary">
          ログイン
        </LinkButton>
      </div>
    </div>
  );
}
