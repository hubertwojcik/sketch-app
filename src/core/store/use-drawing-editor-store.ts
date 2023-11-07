import { PickerColors, strokes } from "@/constants";
import { DrawingModel } from "@/models";
import type { PickerColor, Drawing, Path, Resolution } from "@/types";
import { create } from "zustand";

type DrawingStore = {
    localDrawing: Drawing | undefined;
    setLocalDrawing: (drawing: Drawing) => void;
    setDrawingPaths: (path: Path) => void;
    color: PickerColor;
    setColor: (color: PickerColor) => void;
    strokeWidth: number;
    setStrokeWidth: (strokeWidth: number) => void;
    setLocalDrawingCanvasInfo: (canvasInfo: Resolution) => void;
    createLocalDrawing: () => void;
    discardLocalDrawing: () => void;
};

export const useDrawingEditorStore = create<DrawingStore>((set, get) => ({
    localDrawing: undefined,
    setLocalDrawing: drawing => {
        set({ localDrawing: drawing });
    },
    setDrawingPaths: path => {
        const loc = get().localDrawing;
        if (!loc) return;
        const newPaths = [...loc.drawingPaths, path];
        const localDrawing = { ...loc, drawingPaths: newPaths };
        set({ localDrawing });
    },
    color: PickerColors[0],
    setColor: color => {
        set({ color });
    },
    strokeWidth: strokes[0],
    setStrokeWidth: strokeWidth => {
        set({ strokeWidth });
    },

    setLocalDrawingCanvasInfo: canvasInfo => {
        const loc = get().localDrawing;
        if (!loc) return;
        const localDrawing = { ...loc, canvasInfo };
        set({ localDrawing });
    },
    createLocalDrawing: () =>
        set({ localDrawing: new DrawingModel(), color: PickerColors[0], strokeWidth: strokes[0] }),
    discardLocalDrawing: () =>
        set({ localDrawing: undefined, color: PickerColors[0], strokeWidth: strokes[0] })
}));
