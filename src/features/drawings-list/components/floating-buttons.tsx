import { AnimatedIconButton } from "@/components";
import { FAB_SIZE, ICON_SIZE } from "@/constants";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@/core";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useFloatingActionButtons, useFloatingButtonAnimations } from "../hooks";

export const FloatingActionsButton = () => {
    const { onCreateIconPress, onDeleteIconPress, isOpen, toggleFloatingButtons } =
        useFloatingActionButtons();

    const { reaanimatedCreateIconStyles, reanimatedDeleteIconStyles } =
        useFloatingButtonAnimations(isOpen);

    const onFloatingPress = () => {
        toggleFloatingButtons();
    };

    const { colors } = useTheme();

    return (
        <>
            <View style={styles.container}>
                <AnimatedIconButton
                    reanimatedStyles={reanimatedDeleteIconStyles}
                    onPress={onDeleteIconPress}
                    iconName="trash"
                />
                <AnimatedIconButton
                    reanimatedStyles={reaanimatedCreateIconStyles}
                    onPress={onCreateIconPress}
                    iconName="plus"
                />
                <Pressable onPress={onFloatingPress} style={styles.fabContainer}>
                    <View style={styles.iconContainer}>
                        <Entypo name="dots-three-vertical" size={ICON_SIZE} color={colors.white} />
                    </View>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 10
    },
    iconContainer: {
        height: FAB_SIZE,
        width: FAB_SIZE,
        justifyContent: "center",
        alignItems: "center"
    },
    fabContainer: {
        width: FAB_SIZE,
        backgroundColor: "#0f56b3",
        borderRadius: FAB_SIZE / 2
    }
});
