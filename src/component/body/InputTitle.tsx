import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "./redux/submitPost/submitPostSlice.tsx";
import type { DefaultSubmitBodyDispatch } from "./redux/submitPost/DefaultSubmitBodyStore.tsx";

export function InputTitle() {
  const [onChangeText, setOnChangeText] = useState("");
  const dispatch = useDispatch<DefaultSubmitBodyDispatch>();

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setFinalTitle();
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setOnChangeText(event.target.value);
  }

  function setFinalTitle() {
    dispatch(setTitle(onChangeText));
  }

  return <input value={onChangeText} onChange={handleChange} onBlur={setFinalTitle} onKeyDown={handleKeyDown} placeholder={"제목을 입력하세요"} />;
}
