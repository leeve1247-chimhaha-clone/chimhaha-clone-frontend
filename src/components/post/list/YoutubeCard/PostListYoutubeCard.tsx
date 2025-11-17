import styles from "./PostListYoutubeCard.module.css";
import iconUrl from "../../../../../public/youtube_icon.svg";
import { useWindowSize } from "../../../../context/window-size/UseWindowSize.tsx";

export function PostListYoutubeCard({ title, link }: { title: string, link: string }) {
  const { width } = useWindowSize();
  return <div className={styles.youtubeCard}>
    <div className={styles.row}>
      <img src={iconUrl} alt={"youtube_icon"} />
      <div className={styles.youtubeCard__title}>{title}</div>
    </div>
    {link == "" ?
      <div className={styles.youtubeCard__title}>None</div>
      :
      <iframe className={styles.youtubeCard__body}
              width={width > 800 ? width / 4 : 270}
              height={width > 800 ? width / 4 / 16 * 9 : 180}
              src={link}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
      </iframe>}

  </div>;
}
