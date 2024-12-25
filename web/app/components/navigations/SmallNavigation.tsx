import { Avatar, Badge, Listbox, ListboxItem } from "@nextui-org/react";
import {
  SolarBellLinear,
  SolarHome2Linear,
  SolarLetterLinear,
  SolarMagniferLinear,
  SolarSettingsLinear,
  SolarUsersGroupTwoRoundedLinear,
} from "~/components/icons";

export function SmallNavigation({ pathname }: { pathname: string }) {
  return (
    <div className="sticky inset-y-0 h-dvh w-16 px-2 py-4 flex-shrink-0 border-r hidden sm:block lg:hidden">
      <Listbox
        aria-label="Actions"
        selectionMode="single"
        selectedKeys={[pathname]}
        className="h-full [&>ul]:h-full"
        itemClasses={{
          base: "w-10 h-10 rounded-full transition-colors mb-4 text-default-500 data-[selected=true]:bg-default data-[selected=true]:text-default-foreground last:mb-0",
          title: "hidden",
          selectedIcon: "hidden",
        }}
      >
        <ListboxItem
          key="/home"
          href="/home"
          title="ホーム"
          startContent={<SolarHome2Linear />}
        />
        <ListboxItem
          key="/explore"
          href="/explore"
          title="検索"
          startContent={<SolarMagniferLinear />}
        />
        <ListboxItem
          key="/communities"
          href="/communities"
          title="グループ"
          startContent={<SolarUsersGroupTwoRoundedLinear />}
        />
        <ListboxItem
          key="/messages"
          href="/messages"
          title="メッセージ"
          startContent={<SolarLetterLinear />}
        />
        <ListboxItem
          key="/notifications"
          href="/notifications"
          title="通知"
          startContent={
            <Badge color="primary" size="sm" content="">
              <SolarBellLinear />
            </Badge>
          }
        />
        <ListboxItem
          key="/settings"
          href="/settings"
          title="設定"
          startContent={<SolarSettingsLinear />}
          className="mt-auto"
        />
        <ListboxItem
          key="/users"
          href="/users"
          title="プロフィール"
          startContent={
            <Avatar
              isBordered
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
              className="w-6 h-6"
            />
          }
        />
      </Listbox>
    </div>
  );
}
