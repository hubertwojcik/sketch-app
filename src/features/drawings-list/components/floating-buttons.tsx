import { FAB_SIZE, ICON_SIZE } from "@/constants";
import { Entypo } from "@expo/vector-icons";
import { AnimatedIconButton } from "./animated-icon-button";

import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useFloatingActionButtons } from "../hooks";

import { colors } from "@/ui/theme";
import { getElevation, horizontalScale } from "@/utils";
import Animated from "react-native-reanimated";
import { useToggleFloatingButtonAnimations } from "../animations";

export const FloatingActionsButton = () => {
    const { onCreateIconPress, onDeleteIconPress, isOpen, toggleFloatingButtons, selectionMode } =
        useFloatingActionButtons();

    const {
        reaanimatedCreateIconStyles,
        reanimatedDeleteIconStyles,
        reanimatedFloatingContainerStyles
    } = useToggleFloatingButtonAnimations(isOpen, selectionMode);

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
                <Pressable onPress={toggleFloatingButtons} style={styles.fabContainer}>
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
        backgroundColor: colors.accent,
        borderRadius: FAB_SIZE / 2
    }
});
