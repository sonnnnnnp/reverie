import { Avatar } from "@nextui-org/react";
import { Link } from "react-router";
import type { components } from "~/api/client";
import { timeAgo } from "~/utils/date";

export function PostContentHeader({
  showAvatar,
  post,
}: {
  showAvatar?: boolean;
  post: components["schemas"]["Post"];
}) {
  return (
    <div className="flex items-center gap-1.5 mb-1">
      {showAvatar && (
        <Avatar
          src={post.author.avatar_image_url ?? undefined}
          classNames={{
            base: "flex-shrink-0 w-7 h-7",
          }}
        />
      )}
      <Link
        to={`/@${post.author?.custom_id}`}
        className="hover:underline"
      >
        <span className="font-bold">{post.author.nickname}</span>
      </Link>
      <span className="text-foreground-400">@{post.author.custom_id}</span>
      <span className="ml-auto text-xs text-foreground-400">
        {timeAgo(post.created_at)}
      </span>
    </div>
  );
}
