type Color =
    | "primary"
    | "secondary"
    | "accent"
    | "background"
    | "white"
    | "black"
    | "dark"
    | "grey";

export const colors: Record<Color, string> = {
    primary: "#E2E2EA",
    secondary: "#262631",
    accent: "#ef6824",
    background: "#f1f1f1",
    dark: "#090909e6",
    white: "#fff",
    black: "#000",
    grey: "#444"
};
