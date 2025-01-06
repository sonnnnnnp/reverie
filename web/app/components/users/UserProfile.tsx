import { Avatar, Button } from "@nextui-org/react";
import { Link } from "react-router";
import type { components } from "~/api/client";
import { SolarLetterLinear, SolarMagniferLinear } from "../icons";

export default function UserProfile({
  user,
}: { user: components["schemas"]["User"] | null }) {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src="https://nextui.org/images/hero-card-complete.jpeg"
          alt="banner-image"
          className="object-cover w-full h-40"
        />
        <Avatar
          className="absolute -bottom-10 left-4 w-24 h-24"
          src={user?.avatar_image_url ?? undefined}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4 px-6">
        <Button
          isIconOnly
          variant="bordered"
          radius="full"
          className="h-8 w-8 min-w-8"
        >
          <SolarMagniferLinear className="w-4 h-4" />
        </Button>
        <Button
          isIconOnly
          variant="bordered"
          radius="full"
          className="h-8 w-8 min-w-8"
        >
          <SolarLetterLinear className="w-4 h-4" />
        </Button>
        <Button radius="full" className="h-8 bg-foreground text-default">
          フォローする
        </Button>
      </div>
      <div className="grid gap-4 px-6 pb-2 text-sm">
        <div className="flex flex-col">
          <span className="font-bold text-medium">{user?.nickname}</span>
          <span className="text-foreground-400">@{user?.custom_id}</span>
        </div>
        <p>{user?.biography}</p>
        <div className="flex gap-3 text-xs">
          <Link
            to={`/@${user?.custom_id}/following`}
            className="hover:underline"
          >
            <span className="font-bold mr-1">
              {user?.social_engagement?.following_count}
            </span>
            <span className="text-foreground-400">フォロー中</span>
          </Link>
          <Link
            to={`/@${user?.custom_id}/followers`}
            className="hover:underline"
          >
            <span className="font-bold mr-1">
              {user?.social_engagement?.followers_count}
            </span>
            <span className="text-foreground-400">フォロワー</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
