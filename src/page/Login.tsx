export function Login() {
  const handleLogin = (provider:string) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div>
      <button onClick={() => handleLogin('google')}>Login with Google</button>
      <button onClick={() => handleLogin('github')}>Login with GitHub</button>
    </div>
  );
}
