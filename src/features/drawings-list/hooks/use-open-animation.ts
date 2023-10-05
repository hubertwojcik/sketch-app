import {
    ADD_BUTTON_ANIMATION_DELAY,
    ADD_BUTTON_FINAL_BOTTOM,
    ADD_BUTTON_INITIAL_BOTTOM,
    BUTTON_ANIMATION_DURATION,
    DELETE_BUTTON_ANIMATION_DELAY,
    DELETE_BUTTON_FINAL_BOTTOM,
    DELETE_BUTTON_INITIAL_BOTTOM
} from "@/constants";
import { useEffect } from "react";
import {
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from "react-native-reanimated";

export const useFloatingButtonAnimations = (isOpen: boolean) => {
    const addDrawingValue = useSharedValue(ADD_BUTTON_INITIAL_BOTTOM);
    const deleteDrawingValue = useSharedValue(DELETE_BUTTON_INITIAL_BOTTOM);

    const config = {
        easing: Easing.bezier(0.67, -0.6, 0.32, 1.6),
        duration: BUTTON_ANIMATION_DURATION
    };

    const openAnimation = (condition: boolean) => {
        if (!condition) {
            addDrawingValue.value = withTiming(ADD_BUTTON_INITIAL_BOTTOM, config);
            deleteDrawingValue.value = withDelay(
                DELETE_BUTTON_ANIMATION_DELAY,
                withTiming(DELETE_BUTTON_INITIAL_BOTTOM, config)
            );
        } else {
            addDrawingValue.value = withDelay(
                ADD_BUTTON_ANIMATION_DELAY,
                withSpring(ADD_BUTTON_FINAL_BOTTOM)
            );
            deleteDrawingValue.value = withDelay(
                DELETE_BUTTON_ANIMATION_DELAY,
                withSpring(DELETE_BUTTON_FINAL_BOTTOM)
            );
        }
    };

    useEffect(() => {
        openAnimation(isOpen);
    }, [isOpen]);

    const reaanimatedCreateIconStyles = useAnimatedStyle(() => {
        const scale = interpolate(
            addDrawingValue.value,
            [ADD_BUTTON_INITIAL_BOTTOM, ADD_BUTTON_FINAL_BOTTOM],
            [0, 1],
            Extrapolate.CLAMP
        );
        return { bottom: addDrawingValue.value, transform: [{ scale }] };
    });

    const reanimatedDeleteIconStyles = useAnimatedStyle(() => {
        const scale = interpolate(
            deleteDrawingValue.value,
            [DELETE_BUTTON_INITIAL_BOTTOM, DELETE_BUTTON_FINAL_BOTTOM],
            [0, 1],
            Extrapolate.CLAMP
        );
        return { bottom: deleteDrawingValue.value, transform: [{ scale }] };
    });

    return { reaanimatedCreateIconStyles, reanimatedDeleteIconStyles };
};
