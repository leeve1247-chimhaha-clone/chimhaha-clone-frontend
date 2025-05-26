import { Provider } from "react-redux";
import { commentComponentStore } from "./DefaultSubmitBodyStore.tsx";
import { CommentRootComponent } from "../CommentRootComponent.tsx";

export default function CommentRootComponentProvider(){
  return <Provider store={commentComponentStore}>
    <CommentRootComponent/>
  </Provider>
}
