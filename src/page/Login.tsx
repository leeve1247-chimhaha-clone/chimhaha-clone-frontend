import { useAuth } from "react-oidc-context";
import axios from "axios";

export function Login() {
  const auth = useAuth();
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
      <div>
        {auth.user?.access_token}
        <button
          onClick={() => {
            console.log(auth?.user?.access_token);
            void auth.removeUser();
          }}
        >
          Log out
        </button>
        <button onClick={() => getList()}>Get List</button>
        <button onClick={() => deleteUser()}>Delete User from UserEntityRepository</button>
      </div>
    );
  }

  async function deleteUser(){
    console.log("delete user")
  }

  async function getList() {
    try {
      const myData = await axios.get(
        "http://192.168.1.14:8080/myAccount?username=userC",
        {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        },
      );
      console.log(myData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <button onClick={() => void auth.signinRedirect()}>Log in</button>
    </>
  );
}
