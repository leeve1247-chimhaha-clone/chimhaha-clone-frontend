import cssClass from "./Login.module.css";
import { useAuth } from "react-oidc-context";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { setNickName } from "../../utils/redux/accountSlice.tsx";
import {ImageData} from "../../../credential/data.ts";
import axios from "axios";
import { RootState } from "../../utils/redux/store.tsx";

export function Login() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const nickName = useSelector((state: RootState) => state.accountStatus.nickName);
  async function fetchMeals() {
    const axiosResponse = await axios.get(ImageData.baseUrl + "/getMyNickName", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    });
    console.log("axios response is :" + axiosResponse.data);
    if (axiosResponse.data !== "") {
      dispatch(setNickName(axiosResponse.data));
    }
  }

  if (auth.isLoading) {
    return (
      <section className={cssClass.section}>
        <ul className={cssClass.list}>
          <div>로그인 중...</div>;
        </ul>
      </section>
    );
  }

  if (auth.error) {
    return <div>에러 발생... {auth.error.message}</div>;
  }
  if (auth.isAuthenticated) {
    if (nickName === "" && auth.user?.access_token !== undefined) {
      console.log(nickName);
      fetchMeals().then();
    }
    return (
      <div className={cssClass.container}>
        <button className={cssClass.button}>마이페이지</button>
        <button
          className={cssClass.button}
          onClick={() => {
            void auth.signoutRedirect();
            void auth.removeUser();
          }}
        >
          로그아웃
        </button>
      </div>
    );
  }
  return (
    <div className={cssClass.container}>
      <button className={cssClass.button}>
        <FontAwesomeIcon icon={faUser} />
        <div>회원가입</div>
      </button>
      <button className={cssClass.button} onClick={() => void auth.signinPopup()}>
        <FontAwesomeIcon icon={faRightToBracket} />
        <div>로그인</div>
      </button>
    </div>
  );
}
