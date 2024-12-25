import { Spinner } from "@nextui-org/react";
import React from "react";
import client from "~/api";
import type { components } from "~/api/client";
import { CallTimeline } from "./CallTimeline";
import { PostTimeline } from "./PostTimeline";

type TabType = "following" | "public";

export function Timeline({
  type,
  selected,
}: { type: TabType; selected: boolean }) {
  const [posts, setPosts] = React.useState<components["schemas"]["Post"][]>([]);

  const fetchPosts = React.useCallback(async (type: TabType) => {
    const { data } =
      type === "following"
        ? await client.GET("/timeline/following", {})
        : await client.GET("/timeline", {});

    if (!data?.ok) {
      throw new Error("Failed to fetch post timeline");
    }

    // 擬似的遅延
    await new Promise((resolve) => setTimeout(resolve, 800));

    setPosts(data.data.posts);
  }, []);

  React.useEffect(() => {
    if (selected && !posts.length) {
      fetchPosts(type);
    }
  }, [type, selected, posts, fetchPosts]);

  return (
    <div className="grid place-items-center pb-[600px]">
      {!posts.length ? (
        <Spinner classNames={{ base: "mt-8" }} />
      ) : (
        <>
          <CallTimeline />
          <PostTimeline posts={posts} />
        </>
      )}
    </div>
  );
}
