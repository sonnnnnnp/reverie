import {
  Avatar,
  Button,
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { ImageIcon, ListIcon, MicIcon, XIcon } from "lucide-react";

export function PostModal({
  isOpen,
  onOpenChange,
}: { isOpen: boolean; onOpenChange: (isOpen: boolean) => void }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="lg"
      classNames={{ closeButton: "hidden" }}
      motionProps={{
        variants: {
          enter: {
            scale: 1,
            opacity: 1,
            transition: {
              duration: 0.1,
              ease: "easeOut",
            },
          },
          exit: {
            scale: 1.2,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex space-x-2 px-3 py-2 border-b">
              <Button
                isIconOnly
                radius="full"
                variant="faded"
                className="mr-auto border-none"
                onPress={onClose}
              >
                <XIcon className="w-4 h-4" />
              </Button>
              <Button
                radius="full"
                color="primary"
                variant="light"
                onPress={onClose}
              >
                下書き
              </Button>
              <Button
                radius="full"
                color="primary"
                className="font-medium"
                onPress={onClose}
              >
                投稿
              </Button>
            </ModalHeader>
            <ModalBody className="p-4">
              <div className="flex space-x-2">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                  classNames={{ base: "mt-1 flex-shrink-0" }}
                />
                <Textarea
                  autoFocus
                  placeholder="今日あったこと、興味のあること、なんでも気軽につぶやいてみよう！"
                  classNames={{
                    inputWrapper:
                      "bg-transparent shadow-none group-data-[focus=true]:bg-default-0 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
                    input: "text-medium",
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex gap-4 border-t px-4 py-2 justify-start">
              <Button
                isIconOnly
                radius="full"
                color="primary"
                variant="light"
                onPress={onClose}
              >
                <ImageIcon className="w-6 h-6" />
              </Button>
              <Button
                isIconOnly
                radius="full"
                color="primary"
                variant="light"
                onPress={onClose}
              >
                <ListIcon className="w-6 h-6" />
              </Button>
              <Button
                isIconOnly
                radius="full"
                color="primary"
                variant="light"
                className="mr-auto"
                onPress={onClose}
              >
                <MicIcon className="w-6 h-6" />
              </Button>
              <CircularProgress
                color="primary"
                value={43}
                classNames={{ svg: "w-6 h-6" }}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
