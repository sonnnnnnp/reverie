import {
  type AnimationPlaybackControls,
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  Collection,
  type Key,
} from "react-aria-components";
import { cn } from "~/lib/utils/cn";

type Tab = {
  key: string;
  title: string;
  panelContent: React.ReactNode;
};

type ClassNames = {
  base?: string;
  tabListWrapper?: string;
  tabList?: string;
  tab?: string;
  title?: string;
  cursor?: string;
  panelWrapper?: string;
  panel?: string;
};

export function SwipeableTabs({
  tabs,
  classNames,
  cursorWidth,
  defaultKey,
  onSelectedKeyChange,
}: {
  tabs: Tab[];
  classNames?: ClassNames;
  cursorWidth?: number;
  defaultKey?: string;
  onSelectedKeyChange?: (key: Key) => void;
}) {
  const [selectedKey, setSelectedKey] = React.useState<Key>(
    defaultKey ?? tabs[0].key,
  );
  const [tabElements, setTabElements] = React.useState<
    NodeListOf<HTMLDivElement> | []
  >([]);

  const tabListRef = React.useRef<HTMLDivElement | null>(null);
  const tabPanelsRef = React.useRef<HTMLDivElement | null>(null);
  const animationRef = React.useRef<AnimationPlaybackControls | null>(null);

  const indicatorWidth = cursorWidth ?? 50;

  React.useEffect(() => {
    if (tabElements.length === 0 && tabListRef.current !== null) {
      const tabs = tabListRef.current.querySelectorAll(
        "[role=tab]",
      ) as NodeListOf<HTMLDivElement>;
      setTabElements(tabs);
    }
  }, [tabElements]);

  const { scrollXProgress } = useScroll({
    container: tabPanelsRef,
  });

  const getTabIndex = React.useCallback(
    (x: number) => Math.round((tabs.length - 1) * x),
    [tabs],
  );

  const getCursorIndex = React.useCallback(
    (x: number) => Math.max(0, Math.floor((tabs.length - 1) * x)),
    [tabs],
  );

  const transform = (x: number, property: "offsetLeft" | "offsetWidth") => {
    if (!tabElements.length) return 0;

    const index = getCursorIndex(x);
    const difference =
      index < tabElements.length - 1
        ? tabElements[index + 1][property] - tabElements[index][property]
        : tabElements[index].offsetWidth;
    const percent = (tabElements.length - 1) * x - index;
    const value = tabElements[index][property] + difference * percent;

    // iOS scrolls weird when translateX is 0 for some reason. 🤷‍♂️
    return value || 0.1;
  };

  const x = useTransform(
    scrollXProgress,
    (x) =>
      transform(x, "offsetLeft") +
      transform(x, "offsetWidth") / 2 -
      indicatorWidth / 2,
  );

  useMotionValueEvent(scrollXProgress, "change", (x) => {
    if (!tabElements.length) return;

    const index = getTabIndex(x);
    if (tabs[index]?.key !== selectedKey) {
      setSelectedKey(tabs[index]?.key);
      onSelectedKeyChange?.(tabs[index]?.key);
    }
  });

  const onSelectionChange = (selectedTab: Key) => {
    if (selectedTab === selectedKey) return;

    if (scrollXProgress.getVelocity() && !animationRef.current) {
      return;
    }

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const tabPanel = tabPanelsRef.current!;
    const index = tabs.findIndex((tab) => tab.key === selectedTab);
    if (animationRef.current) {
      animationRef.current.stop();
    }

    animationRef.current = animate(
      tabPanel?.scrollLeft,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      tabPanel?.scrollWidth! * (index / tabs.length),
      {
        type: "spring",
        bounce: 0,
        duration: 0.6,
        onUpdate: (v) => {
          tabPanel.scrollLeft = v;
        },
        onPlay: () => {
          tabPanel.style.scrollSnapType = "none";
        },
        onComplete: () => {
          tabPanel.style.scrollSnapType = "";
          animationRef.current = null;
        },
      },
    );
  };

  return (
    <AriaTabs
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      className={cn("w-full h-full", classNames?.base)}
    >
      <div className={cn("relative", classNames?.tabListWrapper)}>
        <AriaTabList
          ref={tabListRef}
          items={tabs}
          className={cn("flex h-14", classNames?.tabList)}
        >
          {(tab) => (
            <AriaTab
              className={cn(
                "grid place-items-center w-full cursor-pointer text-small text-default-500 transition-opacity outline-0 focus:ring-0 rac-hover:opacity-disabled rac-hover:rac-selected:opacity-100 rac-selected:text-foreground",
                classNames?.tab,
              )}
            >
              <span className={cn("font-medium", classNames?.title)}>
                {tab.title}
              </span>
            </AriaTab>
          )}
        </AriaTabList>
        <motion.span
          style={{ x, width: indicatorWidth }}
          className={cn(
            "absolute bottom-0 h-0.5 z-10 bg-content1-foreground rounded-full",
            classNames?.cursor,
          )}
        />
      </div>
      <div
        ref={tabPanelsRef}
        className={cn(
          "flex w-full overflow-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          classNames?.panelWrapper,
        )}
      >
        <Collection items={tabs}>
          {(tab) => (
            <AriaTabPanel
              shouldForceMount
              className={cn(
                "w-full snap-start snap-always flex-shrink-0",
                classNames?.panel,
              )}
            >
              {tab.panelContent}
            </AriaTabPanel>
          )}
        </Collection>
      </div>
    </AriaTabs>
  );
}
