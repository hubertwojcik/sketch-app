import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { Text } from "@/ui";
import { useSelectionModeAnimations } from "../animations";
import { useWindowDimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
                <AntDesign name="delete" size={22} color={colors.white} />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: colors.dark,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: horizontalScale(Spacings.large),
        paddingVertical: verticalScale(Spacings.small),
        borderRadius: borderRadiusSizes.average
    },
    tabSelectedText: { color: colors.white }
});
