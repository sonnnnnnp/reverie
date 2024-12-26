import { Avatar, Badge, Tab, Tabs } from "@nextui-org/react";
import {
  SolarBellLinear,
  SolarHome2Linear,
  SolarLetterLinear,
  SolarUsersGroupTwoRoundedLinear,
} from "~/components/icons";

export function MobileNavigation({ pathname }: { pathname: string }) {
  return (
    <div className="fixed bottom-0 w-full bg-background z-[99] border-t sm:hidden">
      <Tabs
        fullWidth
        selectedKey={pathname}
        variant="light"
        classNames={{
          tabList: "h-16",
          tab: "h-full data-[focus-visible=true]:outline-0",
          tabContent: "flex items-center",
          cursor: "hidden",
        }}
      >
        <Tab key="/home" href="/home" title={<SolarHome2Linear />} />
        <Tab
          key="/communities"
          href="/communities"
          title={<SolarUsersGroupTwoRoundedLinear />}
        />
        <Tab key="/messages" href="/messages" title={<SolarLetterLinear />} />
        <Tab
          key="/notifications"
          href="/notifications"
          title={
            <Badge color="primary" size="sm" content="">
              <SolarBellLinear />
            </Badge>
          }
        />
        <Tab
          key="/users"
          href="/users"
          title={
            <Avatar
              isBordered
              size="sm"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
          }
        />
      </Tabs>
    </div>
  );
}
