import { Stack } from "expo-router";
import React, { useEffect } from "react";

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

    return <>{loaded && <RootLayoutNav />}</>;
}

function RootLayoutNav() {
    return <Stack screenOptions={{ headerShown: false }} initialRouteName="(amain)" />;
}
