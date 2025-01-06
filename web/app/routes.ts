import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/internal/layout.tsx", [
    route("/home", "./routes/internal/home.tsx"),
    route("/explore", "./routes/internal/explore.tsx"),
    route("/communities", "./routes/internal/communities.tsx"),
    route("/messages", "./routes/internal/messages.tsx"),
    route("/notifications", "./routes/internal/notifications.tsx"),
    route("/settings", "./routes/internal/settings.tsx"),

    layout("./routes/internal/users/layout.tsx", [
      route("/:custom_id", "./routes/internal/users/users.tsx"),
      route("/:custom_id/posts/:post_id", "./routes/internal/users/posts.tsx"),
      route("/:custom_id/followers", "./routes/internal/users/followers.tsx"),
      route("/:custom_id/following", "./routes/internal/users/following.tsx"),
    ]),
  ]),

  layout("routes/external/layout.tsx", [
    index("./routes/external/index.tsx"),
    route("/login", "./routes/external/login.tsx"),
  ]),
] satisfies RouteConfig;
