import { HTMLAttributes } from "react";
import { RData } from "../credential/data.ts";

interface ImageThumbNailProps extends HTMLAttributes<HTMLImageElement>{
  imageId : string
}

export function ImageThumbNail({imageId, className}: ImageThumbNailProps){
  return (
    <div className={className}>
    <img src = {RData.imageViewURl + imageId} alt={""}/>
    </div>
  )
}