import { cn } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  Collection,
  type Key,
} from "react-aria-components";

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
  // defaultKey,
  onSelectedKeyChange,
}: {
  tabs: Tab[];
  classNames?: ClassNames;
  cursorWidth?: number;
  defaultKey?: string;
  onSelectedKeyChange?: (key: Key) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [carouselRef, carouselApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      skipSnaps: false,
    },
    [WheelGesturesPlugin()],
  );

  const handleCarouselSelect = useCallback(() => {
    if (carouselApi) {
      const index = carouselApi.selectedScrollSnap();
      setSelectedIndex(index);

      onSelectedKeyChange?.(tabs[index].key);
    }
  }, [carouselApi, tabs, onSelectedKeyChange]);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on("select", handleCarouselSelect);
    }
    return () => {
      if (carouselApi) {
        carouselApi.off("select", handleCarouselSelect);
      }
    };
  }, [carouselApi, handleCarouselSelect]);

  const onSelectionChange = (selectedTab: Key) => {
    const index = tabs.findIndex((tab) => tab.key === selectedTab);
    if (index !== -1) {
      setSelectedIndex(index);
      carouselApi?.scrollTo(index);
    }
  };

  const calculateCursorTransform = () => {
    cursorWidth = cursorWidth ?? 100;
    const multiplier = 100 / cursorWidth;
    const offset = ((100 - cursorWidth) * multiplier) / 2;
    return `translateX(${selectedIndex * 100 * multiplier + offset}%)`;
  };

  return (
    <AriaTabs
      selectedKey={tabs[selectedIndex].key}
      onSelectionChange={onSelectionChange}
      className={cn("w-full h-full", classNames?.base)}
    >
      <div className={cn("relative", classNames?.tabListWrapper)}>
        <AriaTabList
          items={tabs}
          className={cn("flex h-14", classNames?.tabList)}
        >
          {(tab) => (
            <AriaTab
              className={cn(
                "grid place-items-center w-full cursor-pointer text-small text-default-500 transition-opacity rac-hover:opacity-disabled rac-hover:rac-selected:opacity-100 rac-selected:text-foreground",
                classNames?.tab,
              )}
            >
              <span className={cn(classNames?.title)}>{tab.title}</span>
            </AriaTab>
          )}
        </AriaTabList>
        <div
          className={cn(
            "absolute bottom-0 h-0.5 bg-content1-foreground rounded-full transition-transform duration-300 ease-in-out",
            classNames?.cursor,
          )}
          style={{
            width: `${(cursorWidth ?? 100) / tabs.length}%`,
            transform: calculateCursorTransform(),
          }}
        />
      </div>
      <div ref={carouselRef} className="overflow-hidden">
        <div className={cn("flex w-full", classNames?.panelWrapper)}>
          <Collection items={tabs}>
            {(tab) => (
              <AriaTabPanel
                shouldForceMount
                className={cn(
                  "w-full snap-start flex-shrink-0",
                  classNames?.panel,
                )}
              >
                {tab.panelContent}
              </AriaTabPanel>
            )}
          </Collection>
        </div>
      </div>
    </AriaTabs>
  );
}
