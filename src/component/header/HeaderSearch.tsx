import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import cssClass from "./HeaderSearch.module.css";

export function HeaderSearch() {
  const searchRef = useRef(null);

  function handleSearch() {
    console.log(searchRef.current);
  }

  return (
    <form className={cssClass.headerSearch}>
      <input className={cssClass.input} type="text" placeholder="검색어를 입력하세요" />
      <button className={cssClass.button} onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
