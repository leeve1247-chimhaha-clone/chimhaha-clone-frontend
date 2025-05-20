import { Lexical } from "../wysiwyg/lexical/Lexical.tsx";
import { InputTitle } from "./InputTitle.tsx";
import { Provider } from "react-redux";
import { defaultSubmitBodyStore } from "./redux/submitPost/DefaultSubmitBodyStore.tsx";
import { SubmitPostButton } from "./SubmitPostButton.tsx";

function CancelButton() {
  return <div>취소</div>;
}

export function DefaultSubmitBody() {
  return (
    <Provider store={defaultSubmitBodyStore}>
      <div>
        <div>대분류</div>
        <div>소분류</div>
        <InputTitle />
      </div>
      <Lexical />
      <div>
        <SubmitPostButton />
        <CancelButton />
      </div>
      <div>DefaultSubmitBody</div>
    </Provider>
  );
}
