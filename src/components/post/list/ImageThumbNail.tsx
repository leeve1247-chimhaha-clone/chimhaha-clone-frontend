import type { HTMLAttributes } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { CData } from "../../../../credential/data.ts";
import axios from "axios";

interface ImageThumbNailProps extends HTMLAttributes<HTMLImageElement> {
  fileName: string;
}

export function ImageThumbNail({ fileName, className }: ImageThumbNailProps) {
  const {data, isLoading, error } = useQuery({queryKey: [...queryKeys.ThumbNails, fileName], queryFn:fetchThumbNailImage});
  async function fetchThumbNailImage() {
    return axios.get(CData.local_backend+"/get/thumbnail-src-url?filename=" + fileName).then((res) => {
      return res.data;
    }).catch((err) => {
      console.error(err);
      return undefined;
    })
  }
  if (isLoading) return <></>
  if (error) return <></>;
  if (data === undefined) return <></>;
  return (
    <div className={className}>
      <img src={data} alt={""} />
    </div>
  );
}
