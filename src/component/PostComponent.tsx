export interface PostItem {
  title: string,
  content: string,
  username: string,
  status: string
}

export function PostComponent({ post }: { post: PostItem }) {
  return (
    <tr>
      <th>{post.title}</th>
      <th>{post.content}</th>
      <th>By: {post.username}</th>
      <th>Status: {post.status}</th>
    </tr>
  )
}