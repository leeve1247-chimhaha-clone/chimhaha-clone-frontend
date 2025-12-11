import { type JSX } from "react";
import { BrokenImage } from "../BrokenImage.tsx";
import { calculateDimensions, useSuspenseImage } from "./utils.tsx";

function isSVG(src: string): boolean {
  return src.toLowerCase().endsWith('.svg');
}

export function LazyImage(
  {
    altText,
    className,
    imageRef,
    src,
    width,
    height,
    maxWidth,
    onError
  }: {
    altText: string;
    className: string | null;
    height: "inherit" | number;
    imageRef: { current: null | HTMLImageElement };
    maxWidth: number;
    src: string;
    width: "inherit" | number;
    onError: () => void;
  }): JSX.Element {
  const isSVGImage = isSVG(src);
  const imageStyle = calculateDimensions(isSVGImage, width, height, maxWidth);
  const hasError = useSuspenseImage(src);
  // useEffect(() => {
  //   if (hasError) {
  //     onError();
  //   }
  // }, [hasError, onError]);

  if (hasError) {
    return <BrokenImage/>;
  }
  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={imageStyle}
    />
  );
}


