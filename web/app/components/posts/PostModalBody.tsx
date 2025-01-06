import { Avatar, Divider, Link, ModalBody, Textarea } from "@nextui-org/react";
import type { components } from "~/api/client";
import { useAuth } from "~/providers/AuthProvider";
import { PostContentBody } from "./PostContentBody";
import { PostContentHeader } from "./PostContentHeader";

export function PostModalBody({
  replyToPost,
  repost,
  onTextChange,
}: {
  replyToPost?: components["schemas"]["Post"];
  repost?: components["schemas"]["Post"];
  onTextChange?: (value: string) => void;
}) {
  const me = useAuth();

  return (
    <ModalBody className="min-h-32 p-4 gap-0">
      {replyToPost && (
        <div className="flex gap-4">
          <div>
            {
              <Avatar
                src={replyToPost.author.avatar_image_url ?? undefined}
                classNames={{
                  base: "flex-shrink-0 mt-1",
                }}
              />
            }
            <Divider orientation="vertical" className="mx-auto w-[2px]" />
          </div>
          <div>
            <PostContentHeader post={replyToPost} />
            <PostContentBody className="text-sm" post={replyToPost} />
            <span className="flex gap-1 h-12 items-center text-sm text-foreground-400">
              <span>返信先:</span>
              <Link>@{replyToPost.author.custom_id}</Link>
            </span>
          </div>
        </div>
      )}
      <div className="flex grid-2">
        {
          <Avatar
            src={me?.avatar_image_url ?? undefined}
            classNames={{ base: "flex-shrink-0 mt-1" }}
          />
        }
        <div className="grid gap-2 w-full">
          {/* TODO: メンションやハッシュタグの装飾は <div contenteditable> を使用する */}
          <Textarea
            autoFocus
            minRows={1}
            placeholder={
              replyToPost
                ? `@${replyToPost.author.custom_id} に返信する`
                : repost
                  ? "コメントを入力する"
                  : "今日あったこと、興味のあること、なんでも気軽につぶやいてみよう！"
            }
            classNames={{
              inputWrapper:
                "bg-transparent shadow-none group-data-[focus=true]:bg-default-0 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
              input: "text-medium",
            }}
            onValueChange={onTextChange}
          />
          {repost && (
            <div className="flex gap-4 ml-2 px-3 py-2 border rounded-xl">
              <div>
                <PostContentHeader showAvatar post={repost} />
                <PostContentBody className="text-sm" post={repost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalBody>
  );
}
