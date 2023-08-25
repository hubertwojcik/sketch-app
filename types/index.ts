import { sharedColors, TColors } from "@constants";
import { SkPath } from "@shopify/react-native-skia";
import { Colors } from "utils/elevation";

export type Color = (typeof Colors)[number];

export type Resolution = {
    width: number;
    height: number;
};

export type Path = {
    path: SkPath;
    color: Color;
    strokeWidth: number;
};

export type Drawing = {
    id: string;
    drawingPaths: Path[];
    color: Color;
    strokeWidth: number;
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
