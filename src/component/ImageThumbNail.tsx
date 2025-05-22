import type { HTMLAttributes } from "react";

interface ImageThumbNailProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
}

export function ImageThumbNail({ src, className }: ImageThumbNailProps) {
  return (
    <div className={className}>
      <img src={src} alt={""} />
    </div>
  );
}
