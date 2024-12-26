import { cn } from "~/lib/utils/cn";

export function PostContentBody({
  className,
  text,
}: { className?: string; text?: string }) {
  return <p className={cn("break-all", className)}>{text}</p>;
}
