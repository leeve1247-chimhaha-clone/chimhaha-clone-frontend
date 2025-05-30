import { ClockFill, StarFill } from "react-bootstrap-icons";
import cssClass from "../Header.module.css";

export const HeaderSubCategory = {
  favorite: (
    <div className={cssClass.bContainer}>
      <StarFill />
      즐겨찾기
    </div>
  ),
  recent: (
    <div className={cssClass.bContainer}>
      <ClockFill />
      최근방문
    </div>
  ),
};
