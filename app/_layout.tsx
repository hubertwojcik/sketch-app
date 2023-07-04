import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";

import { useProtectedRoute } from "@hooks";
import { useAuthStore } from "@stores";
import { useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Font from "expo-font";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
    const [loaded, error] = Font.useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    return (
        <>
            {!loaded && <SplashScreen />}
            {loaded && <RootLayoutNav />}
        </>
    );
}

function RootLayoutNav() {
    const { isLoggedIn } = useAuthStore();
    const colorScheme = useColorScheme();

    useProtectedRoute(isLoggedIn);

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
    );
}
