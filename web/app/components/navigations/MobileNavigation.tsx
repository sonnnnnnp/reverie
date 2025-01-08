import { Avatar, Badge, Tab, Tabs } from "@nextui-org/react";
import type { components } from "~/api/client";
import {
  SolarBellLinear,
  SolarHome2Linear,
  SolarLetterLinear,
  SolarUsersGroupTwoRoundedLinear,
} from "~/components/icons";

export function MobileNavigation({
  pathname,
  me,
}: { pathname: string; me: components["schemas"]["User"] | null }) {
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
          href={`/@${me?.custom_id}`}
          title={
            me && (
              <Avatar
                isBordered
                size="sm"
                src={me?.avatar_image_url ?? undefined}
              />
            )
          }
        />
      </Tabs>
    </div>
  );
}
