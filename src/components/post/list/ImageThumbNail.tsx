import type { HTMLAttributes } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { imageApi } from "../../../api/imageApi.ts";

interface ImageThumbNailProps extends HTMLAttributes<HTMLImageElement> {
  fileName: string;
}

export function ImageThumbNail({ fileName, className }: ImageThumbNailProps) {
  const { data, isLoading, error } = useQuery({ queryKey: [...queryKeys.ThumbNails, fileName], queryFn: () => imageApi.fetchThumbNailUrl(fileName) });
  if (isLoading) return <></>
  if (error) return <></>;
  if (data === undefined) return <></>;
  return (
    <div className={className}>
      <img src={data} alt={""} />
    </div>
  );
}
