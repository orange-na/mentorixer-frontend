import styles from "./index.module.css";

export type InputContainerProps = {
  title: string;
  errorMessage?: string;
  children: React.ReactNode;
};

export default function InputContainer(props: InputContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.input_title}>{props.title}</div>
      {props.children}
      {props.errorMessage && (
        <div className={styles.error_message}>{props.errorMessage}</div>
      )}
    </div>
  );
}
