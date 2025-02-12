import { CategoryElement } from "./HeaderSubCategory.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cssClass from "./HeaderSub.module.css";

export default function HeaderSub({ headerCategory }: { headerCategory: CategoryElement }) {
  return (
    <div className={cssClass.container}>
      <FontAwesomeIcon icon={headerCategory.icon} />
      {headerCategory.name}
    </div>
  );
}
