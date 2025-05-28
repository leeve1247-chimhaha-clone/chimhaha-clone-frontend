import { Provider } from "react-redux";
import { defaultPostDetailStore } from "./defaultPostDetailStore.tsx";
import { DefaultDetailBody } from "../../DefaultDetailBody.tsx";

export function DefaultDetailBodyProvider() {
  return (
    <Provider store={defaultPostDetailStore}>
      <DefaultDetailBody />
    </Provider>
  );
}
