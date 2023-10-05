import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";

import { ThemeContextProvider } from "@/core";
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
    return (
        <ThemeContextProvider>
            <Stack screenOptions={{ headerShown: false }} initialRouteName="(amain)" />
        </ThemeContextProvider>
    );
}
