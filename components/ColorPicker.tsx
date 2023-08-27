import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {
    Colors,
    COLOR_PICKER_ANIMATION_DELAY,
    COLOR_PICKER_ANIMATION_DURATION,
    COLOR_PICKER_END_Y_POSITION,
    COLOR_PICKER_HORIZONTAL_SPACING,
    COLOR_PICKER_START_X_POSITION,
    COLOR_PICKER_START_Y_POSITION,
    COLOR_PICKER_WIDTH,
    TOOLBAR_SIZE
} from "@constants";
import { getElevation } from "@utils";
import { useWindowDimensions } from "react-native";
import Dot from "./ColorDot";
import { useTheme } from "@hooks";

type ColorPickerProps = {
    pickerXPosition: number;
    isOpen: boolean;
    toggleOpen: () => void;
};

const ColorPicker = ({ pickerXPosition, isOpen, toggleOpen }: ColorPickerProps) => {
    const { width } = useWindowDimensions();

    const translateY = useSharedValue(COLOR_PICKER_START_Y_POSITION);
    const translateX = useSharedValue(COLOR_PICKER_START_X_POSITION);
    const widthValue = useSharedValue(TOOLBAR_SIZE);
    const isVisible = useSharedValue(0);

    useEffect(() => {
        toggleAnimationValue(isOpen);
    }, [isOpen]);

    const toggleAnimationValue = (open: boolean) => {
        if (open) {
            isVisible.value = withTiming(0);

            translateY.value = withTiming(COLOR_PICKER_END_Y_POSITION, {
                duration: COLOR_PICKER_ANIMATION_DURATION
            });
            translateX.value = withDelay(
                COLOR_PICKER_ANIMATION_DELAY,
                withSpring(width / 2 - COLOR_PICKER_WIDTH / 2 - pickerXPosition)
            );

            widthValue.value = withDelay(
                COLOR_PICKER_ANIMATION_DELAY,
                withSpring(COLOR_PICKER_WIDTH)
            );
        } else {
            isVisible.value = withTiming(0);
            widthValue.value = withTiming(TOOLBAR_SIZE);
            translateX.value = withTiming(COLOR_PICKER_START_X_POSITION);
            translateY.value = withDelay(
                COLOR_PICKER_ANIMATION_DELAY,
                withTiming(COLOR_PICKER_START_Y_POSITION, {
                    duration: COLOR_PICKER_ANIMATION_DURATION
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
        <View style={styles.container}>
            <Animated.View style={[styles.wrapper, animatedWrapperStyles]}>
                <Animated.View
                    style={[
                        styles.pickerListContent,
                        {
                            backgroundColor: colors.white
                        },
                        animatedPickerListContentStyles
                    ]}
                >
                    <Dot color="black" />
                    <View style={[styles.divider, { backgroundColor: colors.black }]} />

                    {Colors.map(i => (
                        <Dot color={i} key={i} />
                    ))}
                </Animated.View>
            </Animated.View>

            <Pressable onPress={toggleOpen} style={styles.pickedColorContainer}>
                <Animated.View style={[styles.pickedColorIndicator, animatedPickerColorStyles]}>
                    <Dot color="black" />
                </Animated.View>
            </Pressable>
        </View>
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
        padding: COLOR_PICKER_HORIZONTAL_SPACING,
        columnGap: COLOR_PICKER_HORIZONTAL_SPACING,
        borderRadius: 100,
        ...getElevation(30)
    },
    pickedColorContainer: {
        height: "100%"
    },
    pickedColorIndicator: { opacity: 1 }
});

export default ColorPicker;
