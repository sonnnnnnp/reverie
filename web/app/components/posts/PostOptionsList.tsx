import { Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "~/utils/cn";
import {
  SolarForbiddenCircleLinear,
  SolarMutedLinear,
  SolarPenNewSquareLinear,
  SolarPinLinear,
  SolarTrashBinTrashLinear,
} from "../icons";

const iconClasses =
  "w-5 h-5 text-default-500 pointer-events-none flex-shrink-0";

export function PostOptionsList({ onSelect }: { onSelect: () => void }) {
  return (
    <Listbox
      aria-label="options-list"
      selectionMode="single"
      onSelectionChange={onSelect}
    >
      <ListboxItem
        key="mute"
        aria-label="mute"
        startContent={<SolarMutedLinear className={iconClasses} />}
      >
        ミュート
      </ListboxItem>
      <ListboxItem
        key="block"
        aria-label="block"
        startContent={<SolarForbiddenCircleLinear className={iconClasses} />}
      >
        ブロック
      </ListboxItem>
      <ListboxItem
        key="pin"
        aria-label="pin"
        startContent={<SolarPinLinear className={iconClasses} />}
      >
        ピン留め
      </ListboxItem>
      <ListboxItem
        key="edit"
        aria-label="edit"
        showDivider
        startContent={<SolarPenNewSquareLinear className={iconClasses} />}
      >
        編集
      </ListboxItem>
      <ListboxItem
        key="delete"
        aria-label="delete"
        color="danger"
        className="text-danger"
        startContent={
          <SolarTrashBinTrashLinear
            className={cn(iconClasses, "text-danger")}
          />
        }
      >
        削除
      </ListboxItem>
    </Listbox>
  );
}
