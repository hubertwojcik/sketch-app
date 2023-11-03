import { useDrawingEditorStore, useDrawingListStore } from "@/core";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useDrawingTile = (onDeleteModeSelect: (drawingId: string) => void) => {
    const { getDrawingById } = useDrawingListStore();
    const { setLocalDrawing } = useDrawingEditorStore();

    const router = useRouter();

    const selectAndNavigateToDrawing = useCallback(
        (drawingId: string) => {
            const drawing = getDrawingById(drawingId);
            if (!drawing) return;
            setLocalDrawing(drawing);
            router.push({ pathname: `(drawing)/` });
        },
        [getDrawingById, setLocalDrawing, router]
    );

    const handleOnDrawingSelect = useCallback(
        (drawingId: string, isDeleteMode: boolean) => {
            if (isDeleteMode) {
                onDeleteModeSelect(drawingId);
            } else {
                selectAndNavigateToDrawing(drawingId);
            }
        },
        [selectAndNavigateToDrawing]
    );

    return { handleOnDrawingSelect };
};
