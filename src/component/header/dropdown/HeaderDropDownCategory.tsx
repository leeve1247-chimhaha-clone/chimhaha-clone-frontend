import { TopicCategory } from "./category/TopicCategory.tsx";
import { SupportCategory } from "./category/SupportCategory.tsx";
import { EventCategory } from "./category/EventCategory.tsx";

export interface HeaderDropDownCategoryElement {
  name: string;
  message: string;
  contents: typeof TopicCategory | typeof SupportCategory | typeof EventCategory;
}

export enum HeaderDropDownCategoryKeys {
  topics = "topics",
  support = "support",
  event = "event",
}

export const HeaderDropDownCategory : {
  [key in HeaderDropDownCategoryKeys]: HeaderDropDownCategoryElement;
} = {
  topics: {
    name: "나라",
    message: "용건만 간단히, 움짤은 한 번  생각",
    contents: TopicCategory
  },
  support: {
    name: "행정실",
    message: "금병영에 상의하세요",
    contents: SupportCategory
  },
  event: {
    name: "이벤트",
    message: "야생의 이벤트가 열렸다.",
    contents: EventCategory
  }
};
