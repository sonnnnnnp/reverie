import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/internal/layout.tsx", [
    route("home", "routes/internal/home.tsx"),
    route("explore", "routes/internal/explore.tsx"),
    route("communities", "routes/internal/communities.tsx"),
    route("messages", "routes/internal/messages.tsx"),
    route("notifications", "routes/internal/notifications.tsx"),
    route("users", "routes/internal/users.tsx"),
    route("settings", "routes/internal/settings.tsx"),
  ]),

  layout("routes/external/layout.tsx", [
    index("routes/external/index.tsx"),
    route("login", "routes/external/login.tsx"),
  ]),
] satisfies RouteConfig;
