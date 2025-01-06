import { Button } from "@nextui-org/react";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import client from "~/api";
import type { components } from "~/api/client";
import { SolarAltArrowLeftLinear, SolarMenuDotsBold } from "~/components/icons";
import UserContent from "~/components/users/UserContent";
import UserProfile from "~/components/users/UserProfile";
import { getCustomId } from "~/utils/path";

export default function User() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = React.useState<components["schemas"]["User"] | null>(
    null,
  );

  const getUser = React.useCallback(async () => {
    const customId = getCustomId(location.pathname);
    if (!customId) {
      window.location.href = "/home";
      return;
    }

    const { data } = await client.GET("/users/custom_id/{custom_id}", {
      params: {
        path: {
          custom_id: customId,
        },
      },
    });

    if (!data?.ok) {
      window.location.href = "/home";
      return;
    }

    setUser(data.data);
  }, [location]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="w-full">
      <div className="sticky top-0 z-10 flex items-center px-2 w-full h-14 bg-transparent backdrop-blur-md border-b">
        <Button
          isIconOnly
          variant="light"
          radius="full"
          onPress={() => navigate(-1)}
        >
          <SolarAltArrowLeftLinear className="w-5 h-5" />
        </Button>
        <div className="grid gap-1 ml-2">
          <span className="font-bold">{user?.nickname}</span>
          <span className="text-xs text-foreground-400">
            {user?.social_engagement?.posts_count}件の投稿
          </span>
        </div>
        <Button isIconOnly variant="light" radius="full" className="ml-auto">
          <SolarMenuDotsBold className="w-5 h-5 rotate-90" />
        </Button>
      </div>
      <UserProfile user={user} />
      <UserContent />
    </div>
  );
}
