import React from "react";
import type { Key } from "react-aria-components";
import { SwipeableTabs } from "~/components/shared/SwipeableTabs";
import { Timeline } from "~/components/timeline/Timeline";

export default function Home() {
  const [currentTabKey, setCurrentTabKey] = React.useState<Key>("following");

  return (
    <SwipeableTabs
      cursorWidth={80}
      onSelectedKeyChange={(key) => setCurrentTabKey(key)}
      classNames={{
        tabListWrapper: "sticky top-0 z-[99] backdrop-blur-md border-b",
      }}
      tabs={[
        {
          key: "following",
          title: "フォロー中",
          panelContent: (
            <div>
              <Timeline
                type="following"
                selected={currentTabKey === "following"}
              />
            </div>
          ),
        },
        {
          key: "public",
          title: "発見",
          panelContent: (
            <div>
              <Timeline type="public" selected={currentTabKey === "public"} />
            </div>
          ),
        },
      ]}
    />
  );
}
