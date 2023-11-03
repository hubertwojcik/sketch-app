import { useEffect } from "react";
import { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";

export const useCheckmarkAnimation = (isSelected: boolean) => {
    const iconScale = useSharedValue(0);

    useEffect(() => {
        if (isSelected) {
            iconScale.value = withSpring(1);
        } else {
            iconScale.value = withSpring(0);
        }
    }, [isSelected]);

    const checkmarkIconStyles = useAnimatedStyle(() => {
        return {
            transform: [{ scale: iconScale.value }]
        };
    });

    return { checkmarkIconStyles };
};
