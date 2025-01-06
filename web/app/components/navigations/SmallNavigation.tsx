import {
  Avatar,
  Badge,
  Listbox,
  ListboxItem,
  useDisclosure,
} from "@nextui-org/react";
import type { components } from "~/api/client";
import {
  SolarBellLinear,
  SolarHome2Linear,
  SolarLetterLinear,
  SolarMagniferLinear,
  SolarPenNewSquareLinear,
  SolarSettingsLinear,
  SolarUsersGroupTwoRoundedLinear,
} from "~/components/icons";
import { PostModal } from "../posts/PostModal";

export function SmallNavigation({
  pathname,
  me,
}: { pathname: string; me: components["schemas"]["User"] | null }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="sticky inset-y-0 h-dvh w-16 py-4 flex-shrink-0 border-r hidden sm:block lg:hidden">
      <Listbox
        aria-label="Actions"
        selectionMode="single"
        selectedKeys={[pathname]}
        classNames={{ base: "h-full", list: "h-full" }}
        itemClasses={{
          base: "w-10 h-10 mx-auto rounded-full transition-colors mb-4 text-default-500 data-[selected=true]:bg-default data-[selected=true]:text-default-foreground last:mb-0",
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
          onPress={onOpen}
          title="投稿"
          className="mt-2 w-12 h-12 bg-foreground text-default data-[hover=true]:bg-foreground data-[hover=true]:text-default data-[hover=true]:opacity-hover data-[pressed=true]:scale-[0.97] data-[selectable=true]:focus:bg-foreground data-[selectable=true]:focus:text-default data-[selected=true]:bg-foreground data-[selected=true]:text-default"
          startContent={
            <SolarPenNewSquareLinear className="mx-auto" strokeWidth={2} />
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
          href={`/@${me?.custom_id}`}
          title="プロフィール"
          startContent={
            <Avatar
              isBordered
              src={me?.avatar_image_url ?? undefined}
              classNames={{ base: "flex-shrink-0 w-6 h-6" }}
            />
          }
        />
      </Listbox>
      <PostModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
