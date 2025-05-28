import { Provider } from "react-redux";
import { commentRootComponentStore } from "./commentRootComponentStore.tsx";
import { CommentRootComponent } from "../../CommentRootComponent.tsx";

export default function CommentRootComponentProvider(){
  return <Provider store={commentRootComponentStore}>
    <CommentRootComponent/>
  </Provider>
}
