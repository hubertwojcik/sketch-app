import {
    PICKER_ANIMATION_DELAY,
    PICKER_ANIMATION_DURATION,
    PICKER_END_Y_POSITION,
    PICKER_HORIZONTAL_SPACING,
    PICKER_START_X_POSITION,
    PICKER_START_Y_POSITION
} from "@/constants";
import { useTheme } from "@/core";
import { AnimatedPickerProps } from "@/types";
import { getElevation } from "@/utils";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from "react-native-reanimated";

export const AnimatedPicker = ({
    pickerXPosition,
    isOpen,
    toolbarSize,
    pickerWidth,
    children,
    indicatorContent,
    startYPosition = PICKER_START_Y_POSITION,
    endYPosition = PICKER_END_Y_POSITION,
    startXPosition = PICKER_START_X_POSITION,
    animationDuration = PICKER_ANIMATION_DURATION,
    animationDelay = PICKER_ANIMATION_DELAY,
    toggleOpen
}: AnimatedPickerProps) => {
    const { width } = useWindowDimensions();

    const translateY = useSharedValue(startYPosition);
    const translateX = useSharedValue(startXPosition);
    const widthValue = useSharedValue(toolbarSize);
    const isVisible = useSharedValue(0);

    useEffect(() => {
        toggleAnimationValue(isOpen);
    }, [isOpen]);

    const toggleAnimationValue = (open: boolean) => {
        if (open) {
            isVisible.value = withTiming(0);

            translateY.value = withTiming(endYPosition, {
                duration: animationDuration
            });
            translateX.value = withDelay(
                animationDelay,
                withSpring(width / 2 - pickerWidth / 2 - pickerXPosition)
            );

            widthValue.value = withDelay(animationDelay, withSpring(pickerWidth));
        } else {
            isVisible.value = withTiming(0);
            widthValue.value = withTiming(toolbarSize);
            translateX.value = withTiming(startXPosition);
            translateY.value = withDelay(
                animationDelay,
                withTiming(startYPosition, {
                    duration: animationDuration
                })
            );
        }
    };

    const animatedWrapperStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        };
    });

    const animatedPickerListContentStyles = useAnimatedStyle(() => {
        return {
            width: widthValue.value,
            transform: [{ translateX: translateX.value }]
        };
    });

    const animatedPickerColorStyles = useAnimatedStyle(() => {
        return {
            opacity: isVisible.value
        };
    });

    const { colors } = useTheme();

    return (
        <Pressable style={styles.container} onPress={() => toggleOpen()}>
            <Animated.View style={[styles.wrapper, animatedWrapperStyles]}>
                <Animated.View
                    style={[
                        styles.pickerListContent,
                        { backgroundColor: colors.white },
                        animatedPickerListContentStyles
                    ]}
                >
                    {children}
                </Animated.View>
            </Animated.View>

            <Animated.View style={[styles.pickedColorIndicator, animatedPickerColorStyles]}>
                {indicatorContent}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        height: "100%",
        justifyContent: "center"
    },
    wrapper: {
        position: "absolute"
    },
    divider: { height: "100%", width: 1 },
    pickerListContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        padding: PICKER_HORIZONTAL_SPACING,
        columnGap: PICKER_HORIZONTAL_SPACING,
        borderRadius: 100,
        ...getElevation(30)
    },

    pickedColorIndicator: { opacity: 1 }
});
