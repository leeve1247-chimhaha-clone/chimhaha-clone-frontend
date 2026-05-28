import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { notificationApi, type NotificationDto } from "../../api/notificationApi.ts";
import { queryKeys } from "../../react-query/queryKeys.tsx";
import styles from "./NotificationsPage.module.css";

export function NotificationsPage() {
  const auth = useAuth();
  const accessToken = auth.user?.access_token;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.Notifications,
    queryFn: () => notificationApi.fetchMyNotifications(accessToken!),
    enabled: !!accessToken,
  });

  const markReadMutation = useMutation({
    mutationFn: (id: number) => notificationApi.markRead(id, accessToken!),
    onSuccess: (_data, id) => {
      queryClient.setQueryData<NotificationDto[]>(queryKeys.Notifications, (prev) =>
        prev?.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    },
  });

  return (
    <div className={styles.notificationsPage}>
      <div className={styles.notificationsPage__banner}>
        <span className={styles.notificationsPage__bannerTitle}>
          ⚠ MSA 학습용 더미 알림입니다
        </span>
        이 알림 도메인은 Phase 1에서 spring 모놀리스로부터 분리한 별개 서비스의 동작을 확인하기 위한
        더미입니다. 게시글이 발행되면 Kafka 이벤트(<code>post.events.v1</code>)를 통해 본인에게
        "내 글이 발행됨" 영수증이 도착합니다. 실용적 가치는 없으며, outbox → broker → consumer →
        자체 DB의 흐름이 살아 있는지 보여주는 용도입니다.
      </div>

      <h1 className={styles.notificationsPage__heading}>알림</h1>

      {!accessToken && (
        <div className={styles.notificationsPage__state}>로그인이 필요합니다.</div>
      )}
      {accessToken && isLoading && (
        <div className={styles.notificationsPage__state}>불러오는 중...</div>
      )}
      {accessToken && error && (
        <div className={styles.notificationsPage__state}>불러오기 실패</div>
      )}
      {accessToken && data && data.length === 0 && (
        <div className={styles.notificationsPage__empty}>알림이 없습니다.</div>
      )}
      {accessToken && data && data.length > 0 && (
        <ul className={styles.notificationsPage__list}>
          {data.map((n) => {
            const className = n.isRead
              ? styles.notificationsPage__item
              : `${styles.notificationsPage__item} ${styles["notificationsPage__item--unread"]}`;
            return (
              <li key={n.id}>
                <button
                  type="button"
                  className={className}
                  onClick={() => {
                    if (!n.isRead) markReadMutation.mutate(n.id);
                  }}
                >
                  <p className={styles.notificationsPage__itemBody}>{n.body}</p>
                  <div className={styles.notificationsPage__itemMeta}>
                    {n.type} · postId={n.postId} · {new Date(n.createdAt).toLocaleString()}
                    {!n.isRead && " · 안 읽음"}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
