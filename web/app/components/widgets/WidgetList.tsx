import { Input } from "@nextui-org/react";
import { SolarMagniferLinear } from "~/components/icons";
import { Widget } from "./Widget";

export function WidgetList() {
  return (
    <div className="sticky inset-y-0 h-dvh w-72 p-4 flex-shrink-0 border-l overflow-y-auto hidden md:block">
      <div className="grid gap-4">
        <Input
          fullWidth
          placeholder="検索する"
          radius="full"
          aria-label="search"
          startContent={<SolarMagniferLinear className="w-5 h-5" />}
        />
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Widget key={i} />
        ))}
      </div>
    </div>
  );
}
