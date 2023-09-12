import { Colors, sharedColors, TColors } from "@constants";
import { SkPath, SkPaint } from "@shopify/react-native-skia";

export type Color = (typeof Colors)[number];

export type Resolution = {
    width: number;
    height: number;
};

export type Path = {
    path: SkPath;
    paint: SkPaint;
    color?: Color;
};

export type Drawing = {
    id: string;
    drawingPaths: Path[];
    canvasInfo: Resolution;
    svg?: string;
};

//COLORS
export type GrayscalePalette = {
    grayscale_0: string;
    grayscale_250: string;
    grayscale_500: string;
    grayscale_750: string;
    grayscale_1000: string;
};

export type SharedColors = typeof sharedColors;

export type ColorPalettes = {
    light: TColors;
    dark: TColors;
};

//THEME
export type ThemeType = "dark" | "light";

export type ThemeContextValue = {
    colors: TColors;
    themeType: ThemeType;
    isDarkTheme: boolean;
    toggleThemeType?: () => void;
    setThemeType?: React.Dispatch<React.SetStateAction<ThemeType>>;
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
