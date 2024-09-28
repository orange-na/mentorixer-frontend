import styles from "./index.module.css";

export type ButtonProps = {
  variant: "primary" | "secondary" | "tertiary";
  type: "submit" | "reset" | "button";
  name?: string;
  value?: string;
  disabled?: boolean;
  width?: number;
  height?: number;
  marginTop?: number;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button(props: ButtonProps) {
  const style = (() => {
    switch (props.variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "tertiary":
        return styles.tertiary;
    }
  })();

  return (
    <button
      className={`${styles.button} ${style}`}
      type={props.type}
      value={props.value}
      disabled={props.disabled}
      style={{
        width: props.width,
        height: props.height,
        marginTop: props.marginTop,
      }}
      onClick={props.onClick}
      name={props.name}
    >
      {props.children}
    </button>
  );
}
