import { useCallback, useMemo, useState } from "react";
import { toggleListItem } from "@/utils";

export const useDrawingsList = () => {
    const [chosenDrawingIds, setChosenDrawingIds] = useState<string[]>([]);

    const handleDeleteModeSelection = useCallback((drawingId: string) => {
        setChosenDrawingIds(current => toggleListItem(drawingId, current));
    }, []);

    const isDrawingSelected = (id: string) => chosenDrawingIds.some(drawingId => id === drawingId);

    const selectedAmount = useMemo(() => chosenDrawingIds.length, [chosenDrawingIds]);

    return {
        chosenDrawingIds,
        handleDeleteModeSelection,
        isDrawingSelected,
        selectedAmount
    };
};
