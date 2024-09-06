import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { RData } from "../credential/data.ts";

export function Login() {
  const auth = useAuth();
  const [nickName, setNickName] = useState<string>("");

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
    fetchMeals().then();
  }, [auth?.user?.profile?.sub]);

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <>
        <div>{nickName}, 안녕하신지요?</div>
        <div>
          <button
            onClick={() => {
              void auth.removeUser();
            }}
          >
            Log out
          </button>
          <button onClick={() => deleteUser()}>
            Delete User from UserEntityRepository
          </button>
        </div>
      </>
    );
  }

  async function deleteUser() {

  }

  return (
    <>
      <button onClick={() => void auth.signinRedirect()}>
        Log in By Github
      </button>
      <button onClick={() => void auth.signinRedirect()}>Log in</button>
    </>
  );
}
