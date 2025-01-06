import { Button, CircularProgress, ModalFooter } from "@nextui-org/react";
import {
  SolarChecklistLinear,
  SolarGalleryLinear,
  SolarMicrophone2Linear,
} from "../icons";

export function PostModalFooter({
  weightedTextLength,
  maxWeightedTextLength = 280,
  onAction,
}: {
  weightedTextLength: number;
  maxWeightedTextLength: number;
  onAction?: (key: "media" | "survey" | "audio") => void;
}) {
  return (
    <ModalFooter className="flex gap-4 border-t px-4 py-2 justify-start">
      <Button
        isIconOnly
        radius="full"
        color="primary"
        variant="light"
        onPress={() => onAction?.("media")}
      >
        <SolarGalleryLinear className="w-6 h-6" />
      </Button>
      <Button
        isIconOnly
        radius="full"
        color="primary"
        variant="light"
        onPress={() => onAction?.("survey")}
      >
        <SolarChecklistLinear className="w-6 h-6" />
      </Button>
      <Button
        isIconOnly
        radius="full"
        color="primary"
        variant="light"
        className="mr-auto"
        onPress={() => onAction?.("audio")}
      >
        <SolarMicrophone2Linear className="w-6 h-6" />
      </Button>
      <CircularProgress
        showValueLabel={maxWeightedTextLength - weightedTextLength <= 15}
        color={
          maxWeightedTextLength - weightedTextLength <= 0 ? "danger" : "primary"
        }
        valueLabel={String(maxWeightedTextLength - weightedTextLength)}
        value={weightedTextLength}
        classNames={{ svg: "w-6 h-6" }}
      />
    </ModalFooter>
  );
}
