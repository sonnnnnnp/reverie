import type { components } from "~/api/client";
import { Post } from "../posts/Post";

export function PostTimeline({
  posts,
}: { posts: components["schemas"]["Post"][] }) {
  return (
    <div className="w-full">
      {posts.map((post, _) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
