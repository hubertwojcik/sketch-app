import { DrawingModel } from "@models";
import { Color, Drawing, Path, Resolution } from "@types";
import { create } from "zustand";

type DrawingStore = {
    drawings: Drawing[];
    removeSketch: (id: string) => void;
    setColor: (id: string, color: Color) => void;
    setStrokeWidth: (id: string, strokeWidth: number) => void;
    addPath: (id: string, path: Path) => void;
    setDrawingPaths: (id: string, completedPaths: Path[]) => void;
    setDrawingSvg: (id: string, svg: string) => void;
    setCanvasInfo: (id: string, canvasInfo: Resolution) => void;
    //TEST
    localDrawing: Drawing;
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
    addPath: (id, path) =>
        set(state => ({
            drawings: state.drawings.map(sketch =>
                sketch.id === id
                    ? { ...sketch, drawingPaths: [...sketch.drawingPaths, path] }
                    : sketch
            )
        })),
    setDrawingPaths: (id, completedPaths) =>
        set(state => ({
            drawings: state.drawings.map(sketch =>
                sketch.id === id ? { ...sketch, drawingPaths: completedPaths } : sketch
            )
        })),
    setDrawingSvg: (id, svg) =>
        set(state => ({
            localDrawing: { ...state.localDrawing, svg }
        })),
    setCanvasInfo: (id, canvasInfo) =>
        set(state => ({
            drawings: state.drawings.map(sketch =>
                sketch.id === id ? { ...sketch, canvasInfo } : sketch
            )
        })),
    //TEST
    localDrawing: new DrawingModel(),
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
            // Replace the existing drawing in the array
            updatedDrawings = drawings.map(d => (d.id === localDrawing.id ? localDrawing : d));
        } else {
            // Add the new drawing to the array
            updatedDrawings = [...drawings, localDrawing];
        }

        set({ drawings: updatedDrawings, localDrawing: new DrawingModel() });
    },
    discardLocalDrawing: () => set({ localDrawing: new DrawingModel() })
}));
export default useDrawingStore;
