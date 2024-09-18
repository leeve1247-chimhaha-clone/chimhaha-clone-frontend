import axios from "axios";
import { useEffect, useState } from "react";
import { PostComponent, PostItem } from "../../component/post/PostComponent.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router.tsx";
import { RData } from "../../credential/data.ts";
import cssClass from "./New.module.css";

export function New() {
  const [data, setData] = useState<PostItem[]>([]); // 데이터를 저장할 상태
  const navigate = useNavigate();
  function goToNav() {
    navigate(ROUTES.Post);
  }
  useEffect(() => {
    // useEffect 내부에 선언함으로써, (개발자들이) 재사용방지
    async function fetchMeals() {
      const axiosResponse = await axios.get(RData.baseUrl + "/posts");
      setData(axiosResponse.data);
    }
    fetchMeals().then();
  }, []);

  return (
    <div>
      <h2 className={cssClass.h2}>침착맨 전체 게시글</h2>
      <section>
        {data.map((post, index) => (
          <PostComponent key={index} post={post} />
        ))}
      </section>
      <div className={cssClass.tailContainer}>
        <button onClick={goToNav} className={cssClass.button}>
          글쓰기
        </button>
      </div>
    </div>
  );
}
