import { cn } from "~/lib/utils/cn";

export function BackgroundTexture({ className }: { className?: string }) {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-[999999]", className)}
    >
      <div className="w-full h-full bg-[url('/misc/background-texture.png')] bg-[length:109px] bg-repeat opacity-[0.06]" />
    </div>
  );
}
