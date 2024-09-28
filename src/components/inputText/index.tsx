import styles from "./index.module.css";

export type InputTextProps = {
  name: string;
  type: "text" | "email" | "password" | "number" | "datetime-local";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  isError: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputText(props: InputTextProps) {
  return (
    <input
      disabled={props.disabled}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      defaultValue={props.defaultValue}
      maxLength={props.maxLength}
      min={props.min}
      max={props.max}
      onChange={props.onChange}
      className={styles.input}
    />
  );
}
