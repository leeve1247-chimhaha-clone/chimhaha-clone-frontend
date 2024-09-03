import { HTMLAttributes } from "react";

interface CreatedDateProps extends HTMLAttributes<HTMLDivElement>{
  date : string
}

export function CreatedDate({ date }: CreatedDateProps) {
  let s = timeAgo(date);
  return <>{s}</>;
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 0) {
    const futureSeconds = Math.abs(seconds);
    if (futureSeconds < 60) return `${futureSeconds}초후`;
    const futureMinutes = Math.floor(futureSeconds / 60);
    if (futureMinutes < 60) return `${futureMinutes}분후`;
    const futureHours = Math.floor(futureMinutes / 60);
    if (futureHours < 24) return `${futureHours}시간후`;
    const futureDays = Math.floor(futureHours / 24);
    return `${futureDays}일 후`;
  } else {
    if (seconds < 60) return `${seconds}초전`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}분전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  }
}