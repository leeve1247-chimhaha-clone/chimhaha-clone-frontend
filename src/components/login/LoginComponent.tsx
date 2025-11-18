import styles from "./Login.module.css";
import { BoxArrowLeft } from "react-bootstrap-icons";
import { useAuth } from "react-oidc-context";
import { CData } from "../../../credential/data.ts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/queryKeys.tsx";

export function LoginComponent() {
  const auth = useAuth();
  const {data, error} = useQuery({queryKey:queryKeys.NickName, queryFn:fetchMeals});
  async function fetchMeals() {
    const axiosResponse = await axios.get(CData.local_backend + "/getMyNickName", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`
      }
    });
    if (axiosResponse.data !== "") {
      return axiosResponse.data;
    }
    return "전문시청팀";
  }

  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  return <div className={styles.container}>
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
  </div>;

}
