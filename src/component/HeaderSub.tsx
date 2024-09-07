import cssClass from "./HeaderSub.module.css";
import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { RData } from "../credential/data.ts";
import { incremented } from "../utils/redux/store.ts";
import { useDispatch } from "react-redux";

export function HeaderSub() {
  const auth = useAuth();
  const [nickName, setNickName] = useState<string>("");
  const dispatch = useDispatch()

  useEffect(() => {
    // useEffect 내부에 선언함으로써, (개발자들이) 재사용방지
    async function fetchMeals() {
      const axiosResponse = await axios.get(RData.baseUrl + "/getMyNickName", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const nameData = axiosResponse.data;
      setNickName(nameData);
    }
    if(nickName === "") {
      fetchMeals().then()
    }
  }, [auth?.user?.profile?.sub]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }
  if (auth.isAuthenticated) {
    dispatch(incremented(auth?.user?.access_token ?? ""));
    return (
      <section className={cssClass.section}>
        <ul className={cssClass.list}>
          <div>{nickName}, 안녕하신지요?</div>
          <div>
            <button
              onClick={() => {
                void auth.removeUser();
              }}
            >
              Log out
            </button>
          </div>
        </ul>
      </section>
  )
  }
  return (
    <section className={cssClass.section}>
      <ul className={cssClass.list}>
        <li>알림 표시</li>
        <li>마이페이지</li>
        <li>포인트</li>
        <button onClick={() => void auth.signinRedirect()}>Log in</button>
      </ul>
    </section>
  );
}
