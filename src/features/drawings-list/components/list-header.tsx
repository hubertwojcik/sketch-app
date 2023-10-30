import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { useSelectionModeAnimations } from "../animations";
import { Text } from "@/ui";
import { Spacings } from "@/ui/theme";
import { horizontalScale, verticalScale } from "@/utils";
import { borderRadiusSizes, colors } from "@/ui/theme";

type CancelSelectionMode = {
    isSelectionMode: boolean;
    cancelSelectionMode: () => void;
};

const WIDTH = Dimensions.get("screen").width;

export const ListHeader = ({ cancelSelectionMode, isSelectionMode }: CancelSelectionMode) => {
    const { reanimatedCancelButtonStyles, reanimatedHeaderStyles } =
        useSelectionModeAnimations(isSelectionMode);

    return (
        <View style={styles.headerContainer}>
            <Animated.View style={reanimatedHeaderStyles}>
                <Text variant="heading1">My Sketcher</Text>
            </Animated.View>

            <Animated.View style={[styles.cancelButtonContainer, reanimatedCancelButtonStyles]}>
                <Pressable onPress={() => cancelSelectionMode()} style={styles.cancelButtonContent}>
                    <Text style={styles.cancelText}>Anuluj</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: verticalScale(Spacings.small),
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        marginBottom: verticalScale(Spacings.medium)
    },
    cancelButtonContainer: {
        alignItems: "flex-end",
        position: "absolute",
        right: 0,
        transform: [
            {
                translateX: WIDTH
            }
        ]
    },
    cancelButtonContent: {
        backgroundColor: colors.dark,
        paddingHorizontal: horizontalScale(Spacings.medium),
        paddingVertical: verticalScale(Spacings.tiny),
        borderRadius: borderRadiusSizes.average
    },
    cancelText: { color: colors.white }
});
