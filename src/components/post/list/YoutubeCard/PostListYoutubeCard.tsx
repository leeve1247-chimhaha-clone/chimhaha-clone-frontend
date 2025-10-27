import styles from "./PostListYoutubeCard.module.css";

import { useWindowSize } from "../../../../context/window-size/UseWindowSize.tsx";

export function PostListYoutubeCard({ title, link }: { title: string, link: string }) {
  const { width } = useWindowSize();
  return <div className={styles.youtubeCard}>
    <div className={styles.youtubeCard__title}>{title}</div>
    <iframe className={styles.youtubeCard__body}
            width={width > 800 ? width / 4 : 270}
            height={width > 800 ? width / 4 / 16 * 9 : 180}
            src={link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
    </iframe>
  </div>;
}
