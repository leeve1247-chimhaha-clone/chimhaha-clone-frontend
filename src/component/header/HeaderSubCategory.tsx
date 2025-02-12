import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";

export interface CategoryElement {
  name: string;
  icon: IconDefinition;
}

enum HeaderSubCategoryKeys {
  favorite = "favorite",
  recent = "recent",
}

type HeaderSubCategoryTable = {
  [key in HeaderSubCategoryKeys]: CategoryElement;
};

export const HeaderSubCategory: HeaderSubCategoryTable = {
  favorite: {
    name: "즐겨찾기",
    icon: faStar,
  },
  recent: {
    name: "최근방문",
    icon: faClock,
  },
}
