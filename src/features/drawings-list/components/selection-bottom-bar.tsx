import { Pressable, Text } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

import { useSelectionModeAnimations } from "../animations";

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
    const { reanimatedBottomBarStyles } = useSelectionModeAnimations(isSelectionMode);

    return (
        <Animated.View
            style={[
                {
                    backgroundColor: "black",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20
                },
                reanimatedBottomBarStyles
            ]}
        >
            <Text style={{ fontSize: 22, color: "white", fontWeight: "600", letterSpacing: 2 }}>
                Zaznaczono {selectedAmount}
            </Text>
            <Pressable onPress={deleteDrawings}>
                <Text>KOSZ</Text>
            </Pressable>
        </Animated.View>
    );
};
