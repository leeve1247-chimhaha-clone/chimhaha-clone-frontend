import {useQueryClient} from "@tanstack/react-query";
import type {RawRouteConfig} from "../../../../router/convertToRouteObjects.tsx";
import {queryKeys} from "../../../../react-query/queryKeys.tsx";
import styles from "../PostSubmit.module.css";
import {useDispatch} from "react-redux";
import {setCategory} from "../../../../redux/post/submit/submitPostSlice.tsx";

export function PostSubmitMainCategoryModalList({ handleModalClose }: { handleModalClose: () => void }) {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);
  const mainCategories = queryData?.map((rawRouteConfig) => {
    return { korean: rawRouteConfig.korean, key: rawRouteConfig.key };
  });
  const dispatch = useDispatch();

  function setMainCategory(mainCategoryKey: string) {
    dispatch(setCategory(mainCategoryKey));
    handleModalClose();
  }

  if (!mainCategories) return;
  return (
    <>
      {mainCategories.map((item) => {
        return (
          <button key = {item.key}
            onClick={() => {
              setMainCategory(item.key);
            }}
            className={styles.categoryListItem}
          >
            {item.korean}
          </button>
        );
      })}
    </>
  );
}
