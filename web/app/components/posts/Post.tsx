import { useDisclosure } from "@nextui-org/react";
import React from "react";
import type { components } from "~/api/client";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";
import { PostModal } from "./PostModal";

export function Post({ post }: { post: components["schemas"]["Post"] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [actionKey, setActionKey] = React.useState<
    "reply" | "repost" | "favorite"
  >();

  return (
    <div className="flex flex-col p-4 pb-1 border-b">
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
        replyToPost={actionKey === "reply" ? { text: "" } : undefined}
        repost={actionKey === "repost" ? { text: "" } : undefined}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
