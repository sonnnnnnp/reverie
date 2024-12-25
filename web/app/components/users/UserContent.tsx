import { Spinner } from "@nextui-org/react";
import React from "react";
import type { Key } from "react-aria-components";
import client from "~/api";
import type { components } from "~/api/client";
import { SwipeableTabs } from "../shared/SwipeableTabs";
import { PostTimeline } from "../timeline/PostTimeline";

type TabType = "posts" | "replies" | "calls" | "media" | "favorites";

export default function UserContent() {
  const [posts, setPosts] = React.useState<components["schemas"]["Post"][]>([]);
  const [replies, setReplies] = React.useState<components["schemas"]["Post"][]>(
    [],
  );
  const [calls, setCalls] = React.useState<components["schemas"]["Post"][]>([]);
  const [media, setMedia] = React.useState<components["schemas"]["Post"][]>([]);
  const [favorites, setFavorites] = React.useState<
    components["schemas"]["Post"][]
  >([]);

  const fetchPosts = React.useCallback(async (type: TabType) => {
    const { data } = await client.GET("/timeline", {});

    if (!data?.ok) {
      throw new Error("Failed to fetch post timeline");
    }

    // 擬似的遅延
    await new Promise((resolve) => setTimeout(resolve, 800));

    switch (type) {
      case "posts":
        return setPosts(data.data.posts);
      case "replies":
        return setReplies(data.data.posts);
      case "calls":
        return setCalls(data.data.posts);
      case "media":
        return setMedia(data.data.posts);
      case "favorites":
        return setFavorites(data.data.posts);
      default:
        return setPosts(data.data.posts);
    }
  }, []);

  React.useEffect(() => {
    fetchPosts("posts");
  }, [fetchPosts]);

  const onTabChange = async (key: Key) => {
    switch (key) {
      case "posts":
        return !posts.length && (await fetchPosts("posts"));
      case "replies":
        return !replies.length && (await fetchPosts("replies"));
      case "calls":
        return !calls.length && (await fetchPosts("calls"));
      case "media":
        return !media.length && (await fetchPosts("media"));
      case "favorites":
        return !favorites.length && (await fetchPosts("favorites"));
      default:
        return !posts.length && (await fetchPosts("posts"));
    }
  };

  return (
    <SwipeableTabs
      cursorWidth={50}
      onSelectedKeyChange={onTabChange}
      classNames={{
        tabListWrapper: "sticky top-[55px] z-[99] bg-background border-b",
      }}
      tabs={[
        {
          key: "posts",
          title: "投稿",
          panelContent: (
            <div className="grid place-items-center">
              {!posts.length ? (
                <Spinner classNames={{ base: "mt-6" }} />
              ) : (
                <PostTimeline posts={posts} />
              )}
            </div>
          ),
        },
        {
          key: "replies",
          title: "返信",
          panelContent: (
            <div className="grid place-items-center">
              {!replies.length ? (
                <Spinner classNames={{ base: "mt-6" }} />
              ) : (
                <PostTimeline posts={replies} />
              )}
            </div>
          ),
        },
        {
          key: "calls",
          title: "通話",
          panelContent: (
            <div className="grid place-items-center">
              {!calls.length ? (
                <Spinner classNames={{ base: "mt-6" }} />
              ) : (
                <PostTimeline posts={calls} />
              )}
            </div>
          ),
        },
        {
          key: "media",
          title: "メディア",
          panelContent: (
            <div className="grid place-items-center">
              {!media.length ? (
                <Spinner classNames={{ base: "mt-6" }} />
              ) : (
                <PostTimeline posts={media} />
              )}
            </div>
          ),
        },
        {
          key: "favorites",
          title: "いいね",
          panelContent: (
            <div className="grid place-items-center">
              {!favorites.length ? (
                <Spinner classNames={{ base: "mt-6" }} />
              ) : (
                <PostTimeline posts={favorites} />
              )}
            </div>
          ),
        },
      ]}
    />
  );
}
