import cssClass from "./Login.module.css";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import axios from "axios";
import { ImageData } from "../../credential/data.ts";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { LoginState, setNickName, setToken } from "../../utils/redux/stateSlice.tsx";

export function Login() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const nickName = useSelector<LoginState, string>((state) => state.nickName);

  useEffect(() => {
    // useEffect 내부에 선언함으로써, (개발자들이) 재사용방지
    async function fetchMeals() {
      const axiosResponse = await axios.get(ImageData.baseUrl + "/getMyNickName", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      dispatch(setNickName(axiosResponse.data));
    }

    if (nickName === "" && auth.user?.access_token !== undefined) {
      fetchMeals().then();
    }
  }, [auth?.user?.profile?.sub]);

  useEffect(() => {
    dispatch(setToken(auth?.user?.access_token ?? ""));
  }, [auth.isAuthenticated]);

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
    return (
      <section className={cssClass.section}>
        <ul className={cssClass.list}>
          <button className={cssClass.buttonAlert}>
            <FontAwesomeIcon className={cssClass.bell} icon={faBell} />
            <div>{`알림 ${2}개`}</div>
          </button>
          <button className={cssClass.button}>마이페이지</button>
          <div>{`포인트 : ${2}`}</div>
          <div>
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
        </ul>
      </section>
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
