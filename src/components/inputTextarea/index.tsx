import styles from "./index.module.css";

export type InputTextareaProps = {
  name: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  isError: boolean;
  height: number;
};

export default function InputTextarea(props: InputTextareaProps) {
  return (
    <textarea
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      defaultValue={props.defaultValue}
      maxLength={props.maxLength}
      className={styles.textarea}
      style={{
        height: props.height,
      }}
    />
  );
}
