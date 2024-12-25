import { cn } from "@nextui-org/react";

export function PostContentBody({
  className,
  text,
}: { className?: string; text?: string }) {
  return <p className={cn("break-all", className)}>{text}</p>;
}
