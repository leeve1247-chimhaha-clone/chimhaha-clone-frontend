import axios from "axios";
import { useEffect, useState } from "react";
import { PostComponent, PostItem } from "../../component/post/PostComponent.tsx";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../router.tsx";
import { RData } from "../../credential/data.ts";

export function New() {
  const [data, setData] = useState<PostItem[]>([]);  // 데이터를 저장할 상태
  useEffect(() => {
    // useEffect 내부에 선언함으로써, (개발자들이) 재사용방지
    async function fetchMeals() {
      const axiosResponse = await axios.get(RData.baseUrl+"/posts")
      setData(axiosResponse.data);
    }
    fetchMeals().then()
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <section>
      {data.map((post, index) => (
        <PostComponent key={index} post={post} />
      ))}
      </section>
      <NavLink to={ROUTES.Post}>글쓰기</NavLink>
    </div>
  );
}
