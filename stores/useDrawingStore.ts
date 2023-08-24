import { DrawingModel } from "@models";
import { Color, Drawing, Path, Resolution } from "@types";
import { create } from "zustand";

type DrawingStore = {
    drawings: Drawing[];
    removeSketch: (id: string) => void;
    setColor: (id: string, color: Color) => void;
    setStrokeWidth: (id: string, strokeWidth: number) => void;
    setDrawingPaths: (id: string, completedPaths: Path[]) => void;
    setDrawingSvg: (id: string, svg: string) => void;
    setLocalDrawingCanvasInfo: (canvasInfo: Resolution) => void;
    localDrawing: Drawing | undefined;
    setLocalDrawing: (id: string) => void;
    createLocalDrawing: () => void;
    updateLocalDrawing: (local: Path[]) => void;
    saveLocalDrawing: () => void;
    discardLocalDrawing: () => void;
};

export const useDrawingStore = create<DrawingStore>((set, get) => ({
    drawings: [],
    removeSketch: id =>
        set(state => ({ drawings: state.drawings.filter(sketch => sketch.id !== id) })),
    setColor: (id, color) =>
        set(state => ({
            drawings: state.drawings.map(sketch =>
                sketch.id === id ? { ...sketch, color } : sketch
            )
        })),
    setStrokeWidth: (id, strokeWidth) =>
        set(state => ({
            drawings: state.drawings.map(sketch =>
                sketch.id === id ? { ...sketch, strokeWidth } : sketch
            )
        })),
    setDrawingPaths: (id, completedPaths) =>
        set(state => ({
            drawings: state.drawings.map(sketch =>
                sketch.id === id ? { ...sketch, drawingPaths: completedPaths } : sketch
            )
        })),
    setDrawingSvg: (id, svg) => {
        const localDrawing = get().localDrawing;
        if (!localDrawing) return;
        const newLocalDrawing = { ...localDrawing, svg };
        set({ localDrawing: newLocalDrawing });
    },
    setLocalDrawingCanvasInfo: canvasInfo => {
        const loc = get().localDrawing;
        if (!loc) return;
        const localDrawing = { ...loc, canvasInfo };
        set({ localDrawing });
    },
    localDrawing: undefined,

    setLocalDrawing: id => {
        const drawing = get().drawings.find(i => i.id === id);
        if (!drawing) {
            return;
        }
        set({ localDrawing: drawing });
    },
    createLocalDrawing: () => set({ localDrawing: new DrawingModel() }),

    updateLocalDrawing: drawing => {
        const loc = get().localDrawing;
        if (!loc) return;
        const localDrawing = { ...loc, drawingPaths: drawing };
        set({ localDrawing });
    },
    saveLocalDrawing: () => {
        const localDrawing = get().localDrawing;

        if (!localDrawing) return;
        const drawings = get().drawings;

        const drawingExists = drawings.find(i => i.id === localDrawing.id);

        let updatedDrawings;
        if (drawingExists) {
            updatedDrawings = drawings.map(d => (d.id === localDrawing.id ? localDrawing : d));
        } else {
            updatedDrawings = [...drawings, localDrawing];
        }

        set({ drawings: updatedDrawings, localDrawing: undefined });
    },
    discardLocalDrawing: () => set({ localDrawing: undefined })
}));
export default useDrawingStore;
