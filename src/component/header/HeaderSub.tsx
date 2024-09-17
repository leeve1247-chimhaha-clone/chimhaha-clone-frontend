import cssClass from "./HeaderSub.module.css";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import axios from "axios";
import { RData } from "../../credential/data.ts";
import { setNickName, setToken, StateProps } from "../../utils/redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export function HeaderSub() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const nickName = useSelector<StateProps, string>((state) => state.nickName);

  useEffect(() => {
    // useEffect 내부에 선언함으로써, (개발자들이) 재사용방지
    async function fetchMeals() {
      const axiosResponse = await axios.get(RData.baseUrl + "/getMyNickName", {
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
    <section className={cssClass.section}>
      <ul className={cssClass.list}>
        <button className={cssClass.button}>회원가입</button>
        <button
          className={cssClass.button}
          onClick={() => void auth.signinRedirect()}
        >
          로그인
        </button>
      </ul>
    </section>
  );
}
