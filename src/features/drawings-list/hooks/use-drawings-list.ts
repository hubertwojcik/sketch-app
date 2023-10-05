import { useDrawingEditorStore, useDrawingListStore } from "@/core";
import { InteractionMode } from "@/types";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useDrawingsList = () => {
    const [choosenDrawingIds, setChoosenDrawingIds] = useState<string[]>([]);
    const { drawings, getDrawingById, interactionMode } = useDrawingListStore();
    const { setLocalDrawing } = useDrawingEditorStore();
    const router = useRouter();

    const handleNavigation = (drawingId: string) => {
        const drawing = getDrawingById(drawingId);
        if (!drawing) return;
        setLocalDrawing(drawing);
        router.push({ pathname: `(drawing)/` });
    };

    const onDrawingSelect = (drawingId: string, isDeleteMode: boolean) => {
        if (isDeleteMode) {
            handleDeleteModeSelection(drawingId);
        } else {
            handleNavigation(drawingId);
        }
    };

    const handleDeleteModeSelection = (drawingId: string) => {
        if (isDrawingSelected(drawingId)) {
            const newDrawings = choosenDrawingIds.filter(drawing => drawing !== drawingId);
            setChoosenDrawingIds(newDrawings);
        } else {
            setChoosenDrawingIds(val => [...val, drawingId]);
        }
    };

    const isDrawingSelected = (id: string) => choosenDrawingIds.some(drawingId => id === drawingId);

    return {
        drawings,
        choosenDrawingIds,
        handleDeleteModeSelection,
        isDrawingSelected,
        onDrawingSelect,
        isSelectionMode: interactionMode === InteractionMode.SELECTION
    };
};
