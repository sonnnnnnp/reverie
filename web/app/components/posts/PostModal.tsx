import { Modal, ModalContent } from "@nextui-org/react";
import React from "react";
import twitterText from "twitter-text";
import client from "~/api";
import type { components } from "~/api/client";
import { modalMotionProps } from "~/utils/motionProps";
import { PostModalBody } from "./PostModalBody";
import { PostModalFooter } from "./PostModalFooter";
import {
  PostModalHeader,
  type PostModalHeaderActionKey,
} from "./PostModalHeader";

export function PostModal({
  isOpen,
  replyToPost,
  repost,
  onOpenChange,
}: {
  isOpen: boolean;
  replyToPost?: components["schemas"]["Post"];
  repost?: components["schemas"]["Post"];
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [text, setText] = React.useState("");
  const [weightedTextLength, setWeightedTextLength] = React.useState(0);

  const onTextChange = (value: string) => {
    const parsedValue = twitterText.parseTweet(value);
    setWeightedTextLength(parsedValue.weightedLength);
    setText(value);

    console.log(JSON.stringify(twitterText.extractMentionsWithIndices(value)));
  };

  const handleCreatePost = async () => {
    const { data } = await client.POST("/posts", {
      body: { text },
    });

    if (!data?.ok) {
      alert("Failed to submit post");
      return;
    }

    onOpenChange(false);
  };

  const onHeaderAction = async (key: PostModalHeaderActionKey) => {
    if (key === "close") onOpenChange(false);
    if (key === "draft") onOpenChange(false);
    if (key === "create") handleCreatePost();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="lg"
      classNames={{ closeButton: "hidden" }}
      motionProps={modalMotionProps}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <PostModalHeader
              onAction={onHeaderAction}
              isReply={!!replyToPost}
            />
            <PostModalBody
              replyToPost={replyToPost}
              repost={repost}
              onTextChange={onTextChange}
            />
            <PostModalFooter
              weightedTextLength={weightedTextLength}
              maxWeightedTextLength={280}
              onAction={onClose}
            />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
