import { Avatar } from "@nextui-org/react";
import { Link } from "react-router";
import type { components } from "~/api/client";
import { PostContentBody } from "./PostContentBody";
import { PostContentHeader } from "./PostContentHeader";

export function PostBody({ post }: { post: components["schemas"]["Post"] }) {
  return (
    <div className="flex pb-1 text-sm">
      <Link to={`/@${post.author?.custom_id}`}>
        <Avatar
          src={post.author.avatar_image_url ?? undefined}
          classNames={{
            base: "flex-shrink-0 mt-1",
          }}
        />
      </Link>
      <div className="grid w-full ml-2">
        <PostContentHeader post={post} />
        <PostContentBody post={post} />
      </div>
    </div>
  );
}
