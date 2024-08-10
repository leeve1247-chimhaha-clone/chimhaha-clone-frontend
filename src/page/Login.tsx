export function Login(){
    return (
      <>
        <div>
          <h1>로그인</h1>
          <form>
            <input type="text" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
            <button>로그인</button>
          </form>
        </div>
      </>
    );
}