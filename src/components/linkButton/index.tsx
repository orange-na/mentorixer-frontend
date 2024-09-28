import Link from "next/link";
import styles from "./index.module.css";

export type LinkButtonProps = {
  variant: "primary" | "secondary" | "tertiary";
  href: string;
  width?: number;
  height?: number;
  marginTop?: number;
  children?: React.ReactNode;
};

export default function LinkButton(props: LinkButtonProps) {
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
    <Link
      className={`${styles.link} ${style}`}
      href={props.href}
      style={{
        width: props.width,
        height: props.height,
        marginTop: props.marginTop,
      }}
    >
      {props.children}
    </Link>
  );
}
