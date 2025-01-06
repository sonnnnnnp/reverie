import { useDisclosure } from "@nextui-org/react";
import React from "react";
import { usePress } from "react-aria";
import { useNavigate } from "react-router";
import type { components } from "~/api/client";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";
import { PostModal } from "./PostModal";

export function Post({ post }: { post: components["schemas"]["Post"] }) {
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [actionKey, setActionKey] = React.useState<
    "reply" | "repost" | "favorite"
  >();

  const { pressProps } = usePress({
    onPress: () => {
      navigate(`/@${post.author.custom_id}/posts/${post.id}`);
    },
  });

  return (
    <div
      className="flex flex-col p-4 pb-1 border-b cursor-pointer"
      {...pressProps}
    >
      <PostBody post={post} />
      <PostFooter
        onAction={(key) => {
          setActionKey(key);

          if (key === "reply" || key === "repost") {
            onOpen();
          }
        }}
      />
      <PostModal
        replyToPost={actionKey === "reply" ? post : undefined}
        repost={actionKey === "repost" ? post : undefined}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
