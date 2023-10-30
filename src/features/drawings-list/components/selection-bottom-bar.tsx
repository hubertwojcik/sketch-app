import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { Text } from "@/ui";
import { useSelectionModeAnimations } from "../animations";
import { useWindowDimensions } from "react-native";

import { borderRadiusSizes, colors, Spacings } from "@/ui/theme";
import { horizontalScale, verticalScale } from "@/utils";

type SelectionBottomBarProps = {
    isSelectionMode: boolean;
    selectedAmount: number;
    deleteDrawings: () => void;
};

export const SelectionBottomBar = ({
    isSelectionMode,
    selectedAmount,
    deleteDrawings
}: SelectionBottomBarProps) => {
    const { width } = useWindowDimensions();
    const { reanimatedBottomBarStyles } = useSelectionModeAnimations(isSelectionMode);

    return (
        <Animated.View
            style={[
                styles.tabContainer,
                {
                    transform: [
                        {
                            translateX: -width
                        }
                    ]
                },
                reanimatedBottomBarStyles
            ]}
        >
            <Text style={styles.tabSelectedText}>Zaznaczono {selectedAmount}</Text>
            <Pressable onPress={deleteDrawings}>
                <Text>KOSZ</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: horizontalScale(Spacings.large),
        paddingVertical: verticalScale(Spacings.small),
        borderRadius: borderRadiusSizes.thick
    },
    tabSelectedText: { color: colors.white }
});
