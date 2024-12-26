import { Outlet } from "react-router";
import { Navigation } from "~/components/navigations/Navigation";
import { MobileComposeButton } from "~/components/shared/MobileComposeButton";
import { WidgetList } from "~/components/widgets/WidgetList";
import { AuthProvider } from "~/providers/AuthProvider";

export default function Layout() {
  return (
    <AuthProvider>
      <div className="flex justify-center min-h-dvh">
        <Navigation />
        <main className="flex-grow max-w-[750px] min-w-0 mb-16 md:mb-0">
          <Outlet />
        </main>
        <WidgetList />
        <MobileComposeButton />
      </div>
    </AuthProvider>
  );
}
