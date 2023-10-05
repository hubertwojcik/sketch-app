import { useDrawingEditorStore, useDrawingListStore } from "@/core";
import { InteractionMode } from "@/types";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";

export const useDrawingsList = () => {
    const { drawings, getDrawingById, interactionMode, setInteractionMode } = useDrawingListStore();

    const [choosenDrawingIds, setChoosenDrawingIds] = useState<string[]>([]);

    const { setLocalDrawing } = useDrawingEditorStore();

    const router = useRouter();

    const handleNavigation = (drawingId: string) => {
        const drawing = getDrawingById(drawingId);
        if (!drawing) return;
        setLocalDrawing(drawing);
        router.push({ pathname: `(drawing)/` });
    };

    const handleDeleteModeSelection = useCallback(
        (drawingId: string) => {
            if (isDrawingSelected(drawingId)) {
                const newDrawings = choosenDrawingIds.filter(drawing => drawing !== drawingId);
                setChoosenDrawingIds(newDrawings);
            } else {
                setChoosenDrawingIds(val => [...val, drawingId]);
            }
        },
        [choosenDrawingIds]
    );

    const onDrawingSelect = useCallback(
        (drawingId: string, isDeleteMode: boolean) => {
            if (isDeleteMode) {
                handleDeleteModeSelection(drawingId);
            } else {
                handleNavigation(drawingId);
            }
        },
        [handleDeleteModeSelection, handleNavigation]
    );

    const cancelSelectionMode = () => {
        setInteractionMode(InteractionMode.CLOSED);
        setChoosenDrawingIds([]);
    };

    const isDrawingSelected = (id: string) => choosenDrawingIds.some(drawingId => id === drawingId);

    const selectedAmount = useMemo(() => choosenDrawingIds.length, [choosenDrawingIds]);

    return {
        drawings,
        choosenDrawingIds,
        handleDeleteModeSelection,
        isDrawingSelected,
        onDrawingSelect,
        cancelSelectionMode,
        isOpenMode: interactionMode === InteractionMode.OPEN,
        isSelectionMode: interactionMode === InteractionMode.SELECTION,
        selectedAmount
    };
};
