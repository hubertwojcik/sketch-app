import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "@/constants";

import { useDrawingEditorStore, useDrawingListStore } from "@/core";
import { makeSvgFromPaths } from "@/utils";
import { useRouter } from "expo-router";

const NAVIGATION_DELAY = 100;

export const useDrawingHeader = () => {
    const router = useRouter();

    const { getDrawingById, updateDrawing, addDrawing } = useDrawingListStore();
    const { localDrawing, discardLocalDrawing } = useDrawingEditorStore();

    const onDrawingSave = async () => {
        if (!localDrawing) {
            return null;
        }
        const { drawingPaths, canvasInfo } = localDrawing;
        const drawingExists = getDrawingById(localDrawing.id);

        const svg =
            drawingPaths &&
            (await makeSvgFromPaths(drawingPaths, {
                width: canvasInfo.width || DEFAULT_CANVAS_WIDTH,
                height: canvasInfo.height || DEFAULT_CANVAS_HEIGHT
            }));

        drawingExists
            ? updateDrawing({ ...localDrawing, svg })
            : addDrawing({ ...localDrawing, svg });

        setTimeout(() => {
            router.back();
        }, NAVIGATION_DELAY);
    };

    const onDrawingDiscard = () => {
        discardLocalDrawing();
        router.back();
    };

    return { onDrawingDiscard, onDrawingSave };
};
