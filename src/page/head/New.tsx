import axios from "axios";
import { useEffect, useState } from "react";
import { PostComponent, PostItem } from "../../component/PostComponent.tsx";

export function New() {
  const [data, setData] = useState<PostItem[]>([]);  // 데이터를 저장할 상태

  useEffect(() => {
    // useEffect 내부에 선언함으로써, (개발자들이) 재사용방지
    async function fetchMeals() {
      const axiosResponse = await axios.get("http://localhost:8080/posts")
      setData(axiosResponse.data);
      console.log(axiosResponse.data)
    }
    fetchMeals().then()
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {data.map((post) => (
        <PostComponent key={post.title} post={post} />
      ))}
    </div>
  );
}
