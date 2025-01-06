import type { components } from "~/api/client";
import { cn } from "~/utils/cn";

export function PostContentBody({
  className,
  post,
}: { className?: string; post: components["schemas"]["Post"] }) {
  return <p className={cn("break-all", className)}>{post.text}</p>;
}
