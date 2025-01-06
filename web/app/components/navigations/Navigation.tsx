import { useLocation } from "react-router";
import { useAuth } from "~/providers/AuthProvider";
import { LargeNavigation } from "./LargeNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { SmallNavigation } from "./SmallNavigation";

export function Navigation() {
  const { pathname } = useLocation();
  const me = useAuth();

  return (
    <div>
      <LargeNavigation pathname={pathname} me={me} />
      <SmallNavigation pathname={pathname} me={me} />
      <MobileNavigation pathname={pathname} me={me} />
    </div>
  );
}
