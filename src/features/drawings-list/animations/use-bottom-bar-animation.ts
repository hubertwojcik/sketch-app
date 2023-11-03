import {
    BOTTOM_BAR_END_POSITION_RIGHT,
    BOTTOM_BAR_INITIAL_POSITION,
    BOTTOM_BAR_POSITION_ANIMATION_DURATION
} from "@/constants";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export const useBottomBarAnimation = (isSelectionMode: boolean) => {
    const bottomBarPosition = useSharedValue(BOTTOM_BAR_INITIAL_POSITION);

    useEffect(() => {
        if (isSelectionMode) {
            bottomBarPosition.value = withTiming(BOTTOM_BAR_END_POSITION_RIGHT, {
                duration: BOTTOM_BAR_POSITION_ANIMATION_DURATION
            });
        } else {
            bottomBarPosition.value = withTiming(Dimensions.get("screen").height, {
                duration: BOTTOM_BAR_POSITION_ANIMATION_DURATION
            });
        }
    }, [isSelectionMode]);

    const reanimatedBottomBarStyles = useAnimatedStyle(() => {
        return {
            top: bottomBarPosition.value
        };
    });

    return {
        reanimatedBottomBarStyles
    };
};
