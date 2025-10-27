import type {JSX} from "react";
import styles from "../Header.module.css";

export function HeaderSub({ category }: { category: JSX.Element }) {
  return (
    <div className={styles.subContainer}>
      <div>{category}</div>
    </div>
  );
}
