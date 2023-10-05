import { ColorPalettes, GrayscalePalette, SharedColors } from "@/types";

export const Colors = ["black", "red", "blue", "green", "orange", "yellow"] as const;

export const sharedColors = {
    blue: "#2775ff",
    green: "#50d1b2",
    violet: "#7747ca",
    orange: "#ec8c56",
    yellow: "#ece663",
    indigo: "#5414f1",
    emerald: "#5eea8d",
    fuschia: "#dd50d6",
    red: "#e23738",
    sky: "#0bd6f4",
    pink: "#fb7bb8",
    white: "#fff",
    black: "#000"
};

export type TColors = GrayscalePalette & SharedColors;

export const ThemeColors: ColorPalettes = {
    dark: {
        grayscale_0: "#0F0F12",
        grayscale_250: "#262631",
        grayscale_500: "#656575",
        grayscale_750: "#E2E2EA",
        grayscale_1000: "#f1f1f1",
        ...sharedColors
    },
    light: {
        grayscale_0: "#f1f1f1",
        grayscale_250: "#E2E2EA",
        grayscale_500: "#656575",
        grayscale_750: "#262631",
        grayscale_1000: "#0F0F12",
        ...sharedColors
    }
};
