import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false
            }}
        >
            <Tabs.Screen name="notes" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}
