"use client";

import React from "react";

import {
  Bell,
  Blocks,
  Home,
  LoaderPinwheel,
  MessagesSquare,
  PencilIcon,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PostDialog } from "../dialog/post-dialog";
import { toast } from "sonner";
import client from "@/lib/api";

import twitterText from "twitter-text";
import { Separator } from "../ui/separator";

export function Navigation() {
  const [open, setOpen] = React.useState(false);
  const [postDialogOpen, setPostDialogOpen] = React.useState(false);
  const [postContentValid, setPostContentValid] = React.useState(false);
  const [postContent, setPostContent] = React.useState("");

  const onPostContentChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostContent(e.target.value);

    const parsedContent = twitterText.parseTweet(e.target.value);

    setPostContentValid(parsedContent.valid);
  };

  const handleDraftPost = async () => {
    setPostDialogOpen(false);
  };

  const handleCreatePost = async () => {
    const { data } = await client.POST("/posts/create", {
      body: {
        content: postContent,
      },
    });

    if (!data?.ok) {
      toast(`エラー: ${data?.code}`, {
        description: "投稿に失敗しました",
      });
      return;
    }

    setPostDialogOpen(false);
  };

  return (
    <nav>
      {/* wide navigation */}
      <div className="sticky inset-y-0 w-64 h-dvh border-r hidden xl:block">
        <div className="flex flex-col space-y-3 items-center justify-center p-4 border-b">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a team"
                className="w-full justify-start px-3 py-8"
              >
                <Avatar className="mr-2 h-10 w-10">
                  <AvatarImage src="/users/placeholder-profile.svg" />
                </Avatar>
                <p className="text-muted-foreground">@username</p>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">hello</PopoverContent>
          </Popover>
          <Button
            className="w-full gap-2"
            onClick={() => {
              setPostDialogOpen(true);
            }}
          >
            投稿する
            <PencilIcon className="size-3.5" />
          </Button>
        </div>
        <div className="flex-1">
          <div className="grid gap-y-3 items-start p-4 text-sm font-medium">
            <Link
              href="/home"
              className="flex items-center gap-3 rounded-lg p-3 text-primary bg-accent"
            >
              <Home className="h-5 w-5" />
              ホーム
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-3 rounded-lg p-3 text-muted-foreground transition-all hover:text-primary"
            >
              <Search className="h-5 w-5" />
              検索
            </Link>
            <Link
              href="/groups"
              className="flex items-center gap-3 rounded-lg p-3 text-muted-foreground transition-all hover:text-primary"
            >
              <Blocks className="h-5 w-5" />
              グループ
            </Link>
            <Link
              href="/messages"
              className="flex items-center gap-3 rounded-lg p-3 text-muted-foreground transition-all hover:text-primary"
            >
              <MessagesSquare className="h-5 w-5" />
              メッセージ
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg p-3 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-5 w-5" />
              設定
            </Link>
          </div>
        </div>
      </div>
      {/* thin navigation */}
      <div className="sticky inset-y-0 flex-col w-16 h-dvh border-r hidden sm:flex xl:hidden">
        <div className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/home"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">ホーム</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">ホーム</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/search"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">検索</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">検索</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/groups"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <Blocks className="h-5 w-5" />
                  <span className="sr-only">グループ</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">グループ</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/messages"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <MessagesSquare className="h-5 w-5" />
                  <span className="sr-only">メッセージ</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">メッセージ</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/notifications"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">通知</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">通知</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator className="w-8" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-9 w-9 p-2.5 overflow-hidden"
                  onClick={() => {
                    setPostDialogOpen(true);
                  }}
                >
                  <PencilIcon className="h-8 w-8" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">設定</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">設定</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">設定</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/users/username"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/users/placeholder-profile.svg" />
                  </Avatar>
                  <span className="sr-only">ユーザー名</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">ユーザー名</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {/* footer navigation */}
      <div className="fixed bottom-0 flex items-center justify-between w-full z-30 h-16 px-6 border-t bg-background sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Home className="h-6 w-6 text-primary" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Blocks className="h-6 w-6 text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <MessagesSquare className="h-6 w-6 text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Bell className="h-6 w-6 text-muted-foreground" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/users/placeholder-profile.svg" />
          </Avatar>
        </Button>
      </div>
      <PostDialog
        open={postDialogOpen}
        postContent={postContent}
        postContentValid={postContentValid}
        onCloseAction={() => setPostDialogOpen(false)}
        onPostContentChange={onPostContentChange}
        handleDraftPost={handleDraftPost}
        handleCreatePost={handleCreatePost}
      />
    </nav>
  );
}
