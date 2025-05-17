import { Lexical } from "../wysiwyg/lexical/Lexical.tsx";

export function DefaultSubmitBody({ routerKey }: { routerKey: string }) {
  return (
    <>
      <Lexical/>
      <div>DefaultSubmitBody</div>
    </>
  );
}
