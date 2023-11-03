import {
    ADD_BUTTON_ANIMATION_DELAY,
    ADD_BUTTON_FINAL_BOTTOM,
    ADD_BUTTON_INITIAL_BOTTOM,
    BUTTON_ANIMATION_DURATION,
    DELETE_BUTTON_ANIMATION_DELAY,
    DELETE_BUTTON_FINAL_BOTTOM,
    DELETE_BUTTON_INITIAL_BOTTOM,
    FLOATING_CONTAINER_DELAY,
    FLOATING_CONTAINER_DURATION,
    FLOATING_CONTAINER_END_POSITION,
    FLOATING_CONTAINER_INITIAL_POSITION
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

export const useToggleFloatingButtonAnimations = (isOpen: boolean, selectionMode: boolean) => {
    const addDrawingValue = useSharedValue(ADD_BUTTON_INITIAL_BOTTOM);
    const deleteDrawingValue = useSharedValue(DELETE_BUTTON_INITIAL_BOTTOM);
    const floatingContainerPosition = useSharedValue(FLOATING_CONTAINER_INITIAL_POSITION);

    useEffect(() => {
        if (selectionMode) {
            floatingContainerPosition.value = withTiming(FLOATING_CONTAINER_END_POSITION, {
                duration: FLOATING_CONTAINER_DURATION
            });
        } else {
            floatingContainerPosition.value = withDelay(
                FLOATING_CONTAINER_DELAY,
                withTiming(FLOATING_CONTAINER_INITIAL_POSITION)
            );
        }
    }, [selectionMode]);

    const config = {
        easing: Easing.bezier(0.67, -0.6, 0.32, 1.6),
        duration: BUTTON_ANIMATION_DURATION
    };

    const toggleAnimation = (condition: boolean) => {
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
        toggleAnimation(isOpen);
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

    const reanimatedFloatingContainerStyles = useAnimatedStyle(() => {
        return {
            right: floatingContainerPosition.value
        };
    });

    return {
        reaanimatedCreateIconStyles,
        reanimatedDeleteIconStyles,
        reanimatedFloatingContainerStyles
    };
};
