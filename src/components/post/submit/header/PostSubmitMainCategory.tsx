import {useState} from "react";
import styles from "../PostSubmit.module.css";
import {ChevronDown} from "react-bootstrap-icons";
import {Modal} from "../../../utils/modal/Modal.tsx";
import {PostSubmitMainCategoryModalList} from "./PostSubmitMainCategoryModalList.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../redux/store.tsx";
import type {RawRouteConfig} from "../../../../router/convertToRouteObjects.tsx";
import {queryKeys} from "../../../../react-query/queryKeys.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {useMatches} from "react-router";

export function PostSubmitMainCategory() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const category = useSelector((state: RootState)=> state.submitPostStatus.category);
  const queryData = useQueryClient().getQueryData<RawRouteConfig[]>(queryKeys.RouterDataFlat);
  const mainCategory = queryData?.find((rawRouteConfig) => (rawRouteConfig.key === category))
  const matches = useMatches();
  const routerCategory = matches[1].pathname.substring(1, matches[1].pathname.length);

  function toggleHandle() {
    setIsModalOpen(!isModalOpen);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  if (mainCategory !== undefined && routerCategory === category) return (
    <div className={styles.categoryFixed}>{mainCategory?.korean}</div>
  )
  return (
    <div className={styles.categorySet}>
      <button className={styles.category} onClick={toggleHandle}>
        {(!mainCategory) && <div>게시판을 선택해주세요</div>}
        {(mainCategory) && <div>{mainCategory?.korean}</div>}
        <div>
          <ChevronDown />
        </div>
      </button>
      <Modal className={styles.categoryList} modalOpen={isModalOpen} handleModalClose={handleModalClose}>
        <PostSubmitMainCategoryModalList handleModalClose = {handleModalClose} />
      </Modal>
    </div>
  );
}
