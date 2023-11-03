import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Text } from "@/ui";
import { borderRadiusSizes, colors, Spacings } from "@/ui/theme";
import { horizontalScale, verticalScale } from "@/utils";
import { useListHeaderAnimations } from "../animations";

type CancelSelectionMode = {
    isSelectionMode: boolean;
    cancelSelectionMode: () => void;
};

const WIDTH = Dimensions.get("screen").width;

export const ListHeader = ({ cancelSelectionMode, isSelectionMode }: CancelSelectionMode) => {
    const { reanimatedCancelButtonStyles, reanimatedHeaderStyles } =
        useListHeaderAnimations(isSelectionMode);

    return (
        <View style={styles.headerContainer}>
            <Animated.View style={reanimatedHeaderStyles}>
                <Text variant="heading1">My Sketcher</Text>
            </Animated.View>

            <Animated.View style={[styles.cancelButtonContainer, reanimatedCancelButtonStyles]}>
                <Pressable onPress={() => cancelSelectionMode()} style={styles.cancelButtonContent}>
                    <Text style={styles.cancelText}>Cancel</Text>
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
