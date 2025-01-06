import {
  Badge,
  Button,
  Divider,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
  useDisclosure,
} from "@nextui-org/react";
import type { components } from "~/api/client";
import {
  SolarBellLinear,
  SolarHome2Linear,
  SolarLetterLinear,
  SolarMagniferLinear,
  SolarSettingsLinear,
  SolarUserLinear,
} from "~/components/icons";
import { SolarPenLinear } from "~/components/icons/solar/linear/SolarPenLinear";
import { SolarUsersGroupTwoRoundedLinear } from "~/components/icons/solar/linear/SolarUsersGroupTwoRoundedLinear";
import { PostModal } from "~/components/posts/PostModal";

export function LargeNavigation({
  pathname,
  me,
}: { pathname: string; me: components["schemas"]["User"] | null }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="sticky inset-y-0 h-dvh w-24 p-2 flex-shrink-0 border-r hidden lg:block lg:w-64 lg:p-6">
      <div className="flex flex-col gap-5 px-2 pt-4">
        <Popover showArrow placement="bottom">
          <PopoverTrigger>
            <User
              as="button"
              className="justify-start"
              classNames={{ name: "font-bold" }}
              avatarProps={{
                src: me?.avatar_image_url ?? undefined,
              }}
              description={`@${me?.custom_id}`}
              name={`${me?.nickname}`}
            />
          </PopoverTrigger>
          <PopoverContent className="p-4">
            ユーザー切り替え実装予定
          </PopoverContent>
        </Popover>
        <Button
          onPress={onOpen}
          className="rounded-full bg-foreground text-default"
          endContent={<SolarPenLinear width={14} height={14} />}
        >
          投稿する
        </Button>
        <PostModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
      <Divider className="my-4" />
      <Listbox
        aria-label="Actions"
        selectionMode="single"
        selectedKeys={[pathname]}
        itemClasses={{
          base: "w-full h-12 rounded-full transition-colors mb-2 text-default-500 data-[selected=true]:bg-default data-[selected=true]:text-default-foreground last:mb-0",
          title: "hidden",
          selectedIcon: "hidden",
        }}
      >
        <ListboxItem
          key="/home"
          href="/home"
          title="ホーム"
          startContent={
            <span className="flex items-center gap-4 ml-2 text-small font-medium">
              <SolarHome2Linear />
              ホーム
            </span>
          }
        />
        <ListboxItem
          key="/explore"
          href="/explore"
          title="見つける"
          startContent={
            <span className="flex items-center gap-4 ml-2 text-small font-medium">
              <SolarMagniferLinear />
              見つける
            </span>
          }
        />
        <ListboxItem
          key="/communities"
          href="/communities"
          title="グループ"
          startContent={
            <span className="flex items-center gap-4 ml-2 text-small font-medium">
              <SolarUsersGroupTwoRoundedLinear />
              コミュニティ
            </span>
          }
        />
        <ListboxItem
          key="/messages"
          href="/messages"
          title="メッセージ"
          startContent={
            <span className="flex items-center gap-4 ml-2 text-small font-medium">
              <SolarLetterLinear />
              メッセージ
            </span>
          }
        />
        <ListboxItem
          key="/notifications"
          href="/notifications"
          title="通知"
          startContent={
            <span className="flex items-center gap-4 ml-2 text-small font-medium">
              <Badge color="primary" size="sm" content="">
                <SolarBellLinear />
              </Badge>
              通知
            </span>
          }
        />
        <ListboxItem
          key="/users"
          href={`/@${me?.custom_id}`}
          title="プロフィール"
          startContent={
            <span className="flex items-center gap-4 ml-2 text-small font-medium">
              <SolarUserLinear />
              プロフィール
            </span>
          }
        />
        <ListboxItem
          key="/settings"
          href="/settings"
          title="設定"
          startContent={
            <span className="flex items-center gap-4 ml-2 text-small font-medium">
              <SolarSettingsLinear />
              設定
            </span>
          }
        />
      </Listbox>
    </div>
  );
}
