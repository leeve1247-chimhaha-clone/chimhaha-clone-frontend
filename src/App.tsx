import {Title} from "./component/Title.tsx";

function App() {

  return (
    <>
        <header>
            <section className={"p-4"}>
                <ul className={"flex space-x-4"}>
                    <li className={"text-stone-100"}>
                        알림 표시
                    </li>
                    <li>
                        마이페이지
                    </li>
                    <li>
                        포인트
                    </li>
                    <li>
                        로그인
                    </li>
                </ul>
            </section>
        </header>
        <Title/>
        <nav>
            <ul>
                <li>
                    👍인기글
                </li>
                <li>
                    전체글
                </li>
                <li>
                    침착맨
                </li>
                <li>
                    웃음
                </li>
                <li>
                    스포츠
                </li>
                <li>
                    취미
                </li>
                <li>
                    인방
                </li>
                <li>
                    일상(익명)
                </li>
                <li>
                    소원의 돌
                </li>
                <li>
                    구쭈
                </li>
                <li>
                    행정실
                </li>
                <li>
                    ⭐이벤트
                </li>
            </ul>
        </nav>
    </>
  )
}

export default App
