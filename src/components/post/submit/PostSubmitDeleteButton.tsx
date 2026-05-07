import { useAuth } from "react-oidc-context";
import { useMatches, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postApi } from "../../../api/postApi.ts";
import styles from "./PostSubmitDeleteButton.module.css";

export function PostSubmitDeleteButton() {
  const auth = useAuth();
  const { postId } = useParams();
  const matches = useMatches();
  const category = matches[1].pathname.substring(1, matches[1].pathname.length);
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function openConfirm() {
    setConfirmOpen(true);
  }

  function closeConfirm() {
    if (isDeleting) return;
    setConfirmOpen(false);
  }

  async function confirmDelete() {
    if (!postId || !auth.user?.access_token) return;
    setIsDeleting(true);
    try {
      await postApi.deletePost(postId, auth.user.access_token);
      navigate("/" + category);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button onClick={openConfirm}>삭제</button>
      {confirmOpen && (
        <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={closeConfirm}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.title}>게시글 삭제</h3>
            <p className={styles.message}>이 게시글을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.</p>
            <div className={styles.actions}>
              <button className={styles.cancel} onClick={closeConfirm} disabled={isDeleting}>
                취소
              </button>
              <button className={styles.danger} onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
