import { Text } from "@/ui";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useBottomBarAnimation } from "../animations";

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
    const { reanimatedBottomBarStyles } = useBottomBarAnimation(isSelectionMode);

    return (
        <Animated.View style={[styles.tabContainer, reanimatedBottomBarStyles]}>
            <Text style={styles.tabSelectedText}>Selected {selectedAmount}</Text>
            <Pressable onPress={deleteDrawings}>
                <AntDesign name="delete" size={22} color={colors.white} />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        position: "absolute",
        alignSelf: "center",
        width: "100%",
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
