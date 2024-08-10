export interface PostItem {
  title: string,
  content: string,
  username: string,
  status: string
}

export function PostComponent({ post }: { post: PostItem }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>By: {post.username}</p>
      <p>Status: {post.status}</p>
    </div>
  )
}