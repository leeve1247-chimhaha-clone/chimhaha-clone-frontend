import styles from "./PostListYoutubeCard.module.css";
import { PostListYoutubeCard } from "./PostListYoutubeCard.tsx";

export function PostListYoutubeCards() {
  return <div className={styles.youtubeCardList}>
    <PostListYoutubeCard title={"최신 침착맨"} link={"https://www.youtube.com/embed/dQw4w9WgXcQ"} />
    <PostListYoutubeCard title={"최신 침착맨 게임"} link={"https://www.youtube.com/embed/dQw4w9WgXcQ"} />
    <PostListYoutubeCard title={"최신 생방송"} link={"https://www.youtube.com/embed/dQw4w9WgXcQ"} />
  </div>;
}
