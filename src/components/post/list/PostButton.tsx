import { useNavigate } from "react-router-dom";
import styles from "./PostButton.module.css";

export function PostButton() {
  const navigate = useNavigate();

  function goToSubmit() {
    navigate("submit");
  }

  return <div className={styles.tail}>
    <button onClick={goToSubmit} className={styles.button}>
      글쓰기
    </button>
  </div>;
}
