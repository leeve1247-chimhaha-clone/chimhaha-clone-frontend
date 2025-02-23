import { HTMLAttributes } from "react";
import { ImageData } from "../../credential/data.ts";

interface ImageThumbNailProps extends HTMLAttributes<HTMLImageElement> {
  postId: number;
  imageId: string;
}

export function ImageThumbNail({
  postId,
  imageId,
  className,
}: ImageThumbNailProps) {
  return (
    <div className={className}>
      <img
        src={ImageData.imageThumbnailViewURl + postId.toString() + "-" + imageId}
        alt={""}
      />
    </div>
  );
}
