import { BUTTON_ANIMATION_DURATION } from "@/constants";
import { useDrawingEditorStore, useDrawingListStore } from "@/core";
import { InteractionMode } from "@/types";
import { useRouter } from "expo-router";

export const useFloatingActionButtons = () => {
    const { createLocalDrawing } = useDrawingEditorStore();
    const { setInteractionMode, interactionMode } = useDrawingListStore();

    const router = useRouter();

    const onCreateIconPress = () => {
        setInteractionMode(InteractionMode.CLOSED);
        createLocalDrawing();
        setTimeout(() => {
            router.push({
                pathname: "(drawing)/"
            });
        }, BUTTON_ANIMATION_DURATION);
    };

    const onDeleteIconPress = () => {
        setInteractionMode(InteractionMode.SELECTION);
    };

    return {
        onCreateIconPress,
        onDeleteIconPress,
        selectionMode: interactionMode === InteractionMode.SELECTION,
        isOpen: interactionMode === InteractionMode.OPEN,
        toggleFloatingButtons: () => {
            if (interactionMode === InteractionMode.CLOSED) {
                setInteractionMode(InteractionMode.OPEN);
            } else if (InteractionMode.OPEN) {
                setInteractionMode(InteractionMode.CLOSED);
            }
        }
    };
};
