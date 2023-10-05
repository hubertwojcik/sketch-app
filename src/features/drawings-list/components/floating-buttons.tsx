import { AnimatedIconButton } from "@/components";
import { FAB_SIZE, ICON_SIZE } from "@/constants";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@/core";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useFloatingActionButtons } from "../hooks";

import Animated from "react-native-reanimated";
import { getElevation, horizontalScale } from "@/utils";
import { useSelectionModeAnimations } from "../animations";
import { useToggleFloatingButtonAnimations } from "../animations/use-toggle-floating-button-animations";

export const FloatingActionsButton = () => {
    const { onCreateIconPress, onDeleteIconPress, isOpen, toggleFloatingButtons, selectionMode } =
        useFloatingActionButtons();

    const { reanimatedFloatingContainerStyles } = useSelectionModeAnimations(selectionMode);

    const { reaanimatedCreateIconStyles, reanimatedDeleteIconStyles } =
        useToggleFloatingButtonAnimations(isOpen);

    const onFloatingPress = () => {
        toggleFloatingButtons();
    };

    const { colors } = useTheme();

    return (
        <>
            <Animated.View style={[styles.container, reanimatedFloatingContainerStyles]}>
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
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
        alignItems: "flex-end",
        position: "absolute",
        bottom: horizontalScale(50),
        right: horizontalScale(30),
        ...getElevation(10)
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
