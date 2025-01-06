import React from "react";
import { Outlet, useLocation } from "react-router";

export default function Layout() {
  const location = useLocation();

  React.useEffect(() => {
    if (!location.pathname.startsWith("/@")) {
      window.location.href = "/home";
    }
  }, [location]);

  return <Outlet />;
}
