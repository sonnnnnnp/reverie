import { Button, ModalHeader } from "@nextui-org/react";
import { MaterialSymbolsCloseRounded } from "../icons";

export type PostModalHeaderActionKey = "close" | "draft" | "create";

export function PostModalHeader({
  onAction,
  isReply,
}: {
  onAction?: (key: PostModalHeaderActionKey) => void;
  isReply?: boolean;
}) {
  return (
    <ModalHeader className="flex gap-x-2 px-3 py-2 border-b">
      <Button
        isIconOnly
        radius="full"
        variant="faded"
        className="mr-auto border-none"
        onPress={() => onAction?.("close")}
      >
        <MaterialSymbolsCloseRounded className="w-5 h-5" />
      </Button>
      <Button
        radius="full"
        color="primary"
        variant="light"
        onPress={() => onAction?.("draft")}
      >
        下書き
      </Button>
      <Button
        radius="full"
        color="primary"
        className="font-medium"
        onPress={() => onAction?.("create")}
      >
        {isReply ? "返信" : "投稿"}
      </Button>
    </ModalHeader>
  );
}
