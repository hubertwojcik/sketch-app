import { Drawing, InteractionMode } from "@/types";
import { create } from "zustand";

type DrawingStore = {
    drawings: Drawing[];
    interactionMode: InteractionMode;
    addDrawing: (drawing: Drawing) => void;
    removeDrawing: (id: string) => void;
    getDrawingById: (id: string) => Drawing | undefined;
    updateDrawing: (drawing: Drawing) => void;
    setInteractionMode: (mode: InteractionMode) => void;
};

export const useDrawingListStore = create<DrawingStore>((set, get) => ({
    drawings: [],
    interactionMode: InteractionMode.CLOSED,
    setInteractionMode: (mode: InteractionMode) => set({ interactionMode: mode }),
    addDrawing: (drawing: Drawing) => set({ drawings: [...get().drawings, drawing] }),
    getDrawingById: id => {
        return get().drawings.find(drawing => drawing.id === id);
    },
    updateDrawing: updatedDrawing => {
        const drawings = get().drawings.map(drawing =>
            drawing.id === updatedDrawing.id ? updatedDrawing : drawing
        );
        set({ drawings });
    },
    removeDrawing: id => {
        const drawings = get().drawings.filter(drawing => drawing.id !== id);
        set({ drawings });
    }
}));
