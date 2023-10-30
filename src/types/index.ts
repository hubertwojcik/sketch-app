import { PickerColors } from "@/constants";
import { SkPath, SkPaint } from "@shopify/react-native-skia";

export enum InteractionMode {
    CLOSED = "CLOSED",
    SELECTION = "SELECTION",
    OPEN = "OPEN"
}

export type PickerColor = (typeof PickerColors)[number];

export type Resolution = {
    width: number;
    height: number;
};

export type Path = {
    path: SkPath;
    paint: SkPaint;
    color?: PickerColor;
};

export type Drawing = {
    id: string;
    drawingPaths: Path[];
    canvasInfo: Resolution;
    svg?: string;
};

export type CustomPickerProps = {
    pickerXPosition: number;
    isOpen: boolean;
    toggleOpen: () => void;
};

export type AnimatedPickerProps = CustomPickerProps & {
    pickerXPosition: number;
    pickerWidth: number;
    toolbarSize: number;
    children: React.ReactNode;
    indicatorContent: React.ReactNode;
    startYPosition?: number;
    endYPosition?: number;
    startXPosition?: number;
    animationDuration?: number;
    animationDelay?: number;
};
