import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

import { useColorScheme } from "react-native";
import { AuthProvider } from "../context/auth.context";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <AuthProvider>
                <Stack />
            </AuthProvider>
        </ThemeProvider>
    );
}
