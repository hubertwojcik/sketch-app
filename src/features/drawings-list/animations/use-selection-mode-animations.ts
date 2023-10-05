import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export const useSelectionModeAnimations = (isSelectionMode: boolean) => {
    const { width } = useWindowDimensions();

    const bottomBarHeight = useSharedValue(0);
    const floatingButtonRightPosition = useSharedValue(20);
    const headerTitleTranslation = useSharedValue(0);
    const headerCancelButtonTranslation = useSharedValue(width);

    useEffect(() => {
        if (isSelectionMode) {
            //Hide Floating button to right side
            floatingButtonRightPosition.value = withTiming(-60, { duration: 200 });
            //Move header to left
            headerTitleTranslation.value = withTiming(-width, { duration: 250 });
            //Move cancel to left
            headerCancelButtonTranslation.value = withTiming(0, { duration: 250 });
            // Show bottom bar
            bottomBarHeight.value = withDelay(250, withTiming(50));
        } else {
            // Hide bottom bar
            bottomBarHeight.value = withTiming(0, { duration: 200 });
            //Move header to right
            headerTitleTranslation.value = withTiming(0, { duration: 300 });
            //Move Cancel to right
            headerCancelButtonTranslation.value = withTiming(width);
            //Show floating button
            floatingButtonRightPosition.value = withDelay(200, withTiming(20));
        }
    }, [isSelectionMode]);

    const reanimatedBottomBarStyles = useAnimatedStyle(() => {
        return {
            height: bottomBarHeight.value
        };
    }, [isSelectionMode]);

    const reanimatedFloatingContainerStyles = useAnimatedStyle(() => {
        return {
            right: floatingButtonRightPosition.value
        };
    });

    const reanimatedHeaderStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: headerTitleTranslation.value
                }
            ]
        };
    });

    const reanimatedCancelButtonStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: headerCancelButtonTranslation.value
                }
            ]
        };
    });

    return {
        reanimatedBottomBarStyles,
        reanimatedFloatingContainerStyles,
        reanimatedHeaderStyles,
        reanimatedCancelButtonStyles
    };
};
