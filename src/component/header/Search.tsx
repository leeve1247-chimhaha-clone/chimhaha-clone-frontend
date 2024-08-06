import { HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";

interface SearchProps extends HTMLAttributes<HTMLDivElement> {}

export function Search({}: SearchProps) {
  return (
    <Form>
      <input type="text" placeholder="검색어를 입력하세요" />
      <button>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </Form>
  );
}
