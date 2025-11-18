import styles from "./Login.module.css";
import { useAuth } from "react-oidc-context";
import { BoxArrowInRight, PersonFill } from "react-bootstrap-icons";
import { LoginComponent } from "./LoginComponent.tsx";

export function Account() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className={`${styles.button} ${styles.notButton}`}>
        <div>로그인 중...</div>
      </div>
    );
  }
  if (auth.error) {
    window.location.reload();
    return <div className={`${styles.button} ${styles.notButton}`}>로그인 실패...</div>;
  }
  if (auth.isAuthenticated) {
    return (
      <LoginComponent/>
    );
  }
  return (
    <div className={styles.container}>
      <button className={styles.button}>
        <PersonFill />
        <div>회원가입</div>
      </button>
      <button className={styles.button} onClick={() => void auth.signinPopup()}>
        <BoxArrowInRight />
        <div>로그인</div>
      </button>
    </div>
  );
}
