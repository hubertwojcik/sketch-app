import { DrawingModel } from "@models";
import { Color, Drawing, Path, Resolution } from "@types";
import { create } from "zustand";

type DrawingStore = {
    localDrawing: Drawing | undefined;
    setLocalDrawing: (drawing: Drawing) => void;
    setDrawingPaths: (paths: Path[]) => void;
    setColor: (color: Color) => void;
    setStrokeWidth: (strokeWidth: number) => void;
    setLocalDrawingCanvasInfo: (canvasInfo: Resolution) => void;
    createLocalDrawing: () => void;
    discardLocalDrawing: () => void;
};

export const useDrawingStore = create<DrawingStore>((set, get) => ({
    localDrawing: undefined,
    setLocalDrawing: drawing => {
        set({ localDrawing: drawing });
    },
    setDrawingPaths: paths => {
        const loc = get().localDrawing;
        if (!loc) return;
        const localDrawing = { ...loc, drawingPaths: paths };
        set({ localDrawing });
    },

    setColor: color => {
        const loc = get().localDrawing;
        if (!loc) return;
        const localDrawing = { ...loc, color };
        set({ localDrawing });
    },
    setStrokeWidth: strokeWidth => {
        const loc = get().localDrawing;
        if (!loc) return;
        const localDrawing = { ...loc, strokeWidth };
        set({ localDrawing });
    },

    setLocalDrawingCanvasInfo: canvasInfo => {
        const loc = get().localDrawing;
        if (!loc) return;
        const localDrawing = { ...loc, canvasInfo };
        set({ localDrawing });
    },
    createLocalDrawing: () => set({ localDrawing: new DrawingModel() }),
    discardLocalDrawing: () => set({ localDrawing: undefined })
}));
export default useDrawingStore;
