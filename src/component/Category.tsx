import { HTMLAttributes } from "react";

interface CategoryProps extends HTMLAttributes<HTMLDivElement>{
  category:string
}

export function Category({ className, category }: CategoryProps) {
  const translatedCategory = CategoryEnum[category as keyof typeof CategoryEnum] || category;
  return <div className = {className}>{translatedCategory}</div>;
}

export enum CategoryEnum {
  BEST= "인기글",
  CHECK= "일상",
  CHIM = "침착맨",
  FAKEMON = "짭켓몬",
  GOODS_REVIEW = "구쭈",
  HOBBY = "취미",
  HUMOR = "웃음",
  INTERNET = "인방",
  LIFE = "일상",
  MANAGEMENT = "행정실",
  REPORT = "신고/건의",
  SPORTS = "스포츠",
  PET = "반려동물",
  IDOL = "아이돌",
  TRAVEL = "여행",
}