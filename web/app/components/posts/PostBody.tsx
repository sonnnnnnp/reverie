import { Avatar, AvatarIcon } from "@nextui-org/react";
import type { components } from "~/api/client";
import { PostContentBody } from "./PostContentBody";
import { PostContentHeader } from "./PostContentHeader";

export function PostBody({ post }: { post: components["schemas"]["Post"] }) {
  return (
    <div className="flex pb-1 text-sm">
      <Avatar icon={<AvatarIcon />} classNames={{ base: "flex-shrink-0" }} />
      <div className="grid w-full ml-2">
        <PostContentHeader
          nickname={post.author.nickname}
          customId={post.author.custom_id}
          postCreatedAt={post.created_at}
        />
        <PostContentBody text={post.text ?? ""} />
      </div>
    </div>
  );
}
