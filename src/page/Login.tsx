import { useAuth } from "react-oidc-context";

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
        Hello,
        {auth?.user?.profile?.sub}
        <button
          onClick={() => {
            console.log(auth?.user?.access_token);
            void auth.removeUser();
          }}
        >
          Log out
        </button>
        <button onClick={() => deleteUser()}>Delete User from UserEntityRepository</button>
      </div>
    );
  }

  async function deleteUser(){
    console.log("delete user")
  }

  return (
    <>
      <button onClick={() => void auth.signinRedirect()}>Log in By Github</button>
      <button onClick={() => void auth.signinRedirect()}>Log in</button>
    </>
  );
}
