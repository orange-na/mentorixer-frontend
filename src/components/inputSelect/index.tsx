import { ChangeEvent } from "react";
import styles from "./index.module.css";
import { FaAngleDown } from "react-icons/fa";

export type InputSelectProps = {
  name: string;
  selectedValue?: string | number;
  options: { value: string | number; label: string | number }[];
  isError?: boolean;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export default function InputSelect(props: InputSelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  return (
    <div
      className={styles.select_container}
      style={{
        outline: props.isError ? "1px solid #f53753" : undefined,
        width: props.width,
        height: props.height,
      }}
    >
      <select
        onChange={handleChange}
        defaultValue={props.selectedValue}
        className={styles.select}
        name={props.name}
      >
        {props.placeholder && (
          <option value="" hidden>
            {props.placeholder}
          </option>
        )}
        {props.options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <FaAngleDown />
    </div>
  );
}
