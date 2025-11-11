import styles from "./Login.module.css";
import { useAuth } from "react-oidc-context";
import { useDispatch, useSelector } from "react-redux";
import { setNickName } from "../../redux/account/accountSlice.tsx";
import { CData } from "../../../credential/data.ts";
import axios from "axios";
import type { RootState } from "../../redux/store.tsx";
import { BoxArrowInRight, BoxArrowLeft, PersonFill } from "react-bootstrap-icons";

export function Login() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const nickName = useSelector((state: RootState) => state.accountStatus.nickName);

  async function fetchMeals() {
    const axiosResponse = await axios.get(CData.local_backend + "/getMyNickName", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    });
    // console.log("axios response is :" + axiosResponse.data);
    if (axiosResponse.data !== "") {
      dispatch(setNickName(axiosResponse.data));
    }
  }

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
    if (nickName === "" && auth.user?.access_token !== undefined) {
      fetchMeals().then();
    }
    return (
      <div className={styles.container}>
        <button className={styles.button}>마이페이지</button>
        <button
          className={styles.button}
          onClick={() => {
            void auth.signoutRedirect();
            void auth.removeUser();
          }}
        >
          <BoxArrowLeft />
          로그아웃
        </button>
      </div>
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
