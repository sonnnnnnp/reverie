import { Button, useDisclosure } from "@nextui-org/react";
import { SolarPenNewSquareLinear } from "../icons";
import { PostModal } from "../posts/PostModal";

export function MobileComposeButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="fixed bottom-20 right-4 z-[99] sm:hidden">
      <Button
        isIconOnly
        radius="full"
        color="primary"
        variant="shadow"
        className="w-14 h-14"
        onPress={onOpen}
      >
        <SolarPenNewSquareLinear className="w-7 h-7" />
      </Button>
      <PostModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
