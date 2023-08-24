import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import { TabButton } from "@components";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tabs.Screen
                name="notes"
                options={{
                    tabBarButton: props => (
                        <TabButton label={"Notes"} iconName={"home"} {...props} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarButton: props => (
                        <TabButton label={"Profile"} iconName={"user"} {...props} />
                    )
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        position: "absolute",
        bottom: 32,
        right: 16,
        left: 16,
        borderRadius: 16,
        shadowColor: "black",
        shadowOffset: {
            height: 1,
            width: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        elevation: 5
    }
});
