import { SwipeableTabs } from "~/components/shared/SwipeableTabs";

export default function Explore() {
  return (
    <SwipeableTabs
      cursorWidth={50}
      onSelectedKeyChange={(key) => console.log(key)}
      classNames={{ tabListWrapper: "sticky top-0 z-[99]" }}
      tabs={[
        {
          key: "trending",
          title: "トレンド",
          panelContent: (
            <div className="grid place-items-center h-[1000px]">トレンド</div>
          ),
        },
        {
          key: "popular",
          title: "人気",
          panelContent: (
            <div className="grid place-items-center h-full">人気</div>
          ),
        },
        {
          key: "new",
          title: "新着",
          panelContent: (
            <div className="grid place-items-center h-full">news</div>
          ),
        },
      ]}
    />
  );
}
