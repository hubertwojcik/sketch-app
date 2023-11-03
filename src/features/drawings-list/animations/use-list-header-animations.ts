import {
    HEADER_BUTTON_INITIAL_POSITION,
    HEADER_BUTTON_TRANSLATION_DURATION,
    HEADER_TITLE_END_POSITION,
    HEADER_TITLE_TRANSLATION_DURATION,
    SCREEN_WIDTH
} from "@/constants";
import { useEffect } from "react";

import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export const useListHeaderAnimations = (isSelectionMode: boolean) => {
    const buttonTranslation = useSharedValue(SCREEN_WIDTH);
    const headerTitleTranslation = useSharedValue(0);

    useEffect(() => {
        if (isSelectionMode) {
            headerTitleTranslation.value = withTiming(-SCREEN_WIDTH, {
                duration: HEADER_TITLE_TRANSLATION_DURATION
            });

            buttonTranslation.value = withTiming(HEADER_BUTTON_INITIAL_POSITION, {
                duration: HEADER_BUTTON_TRANSLATION_DURATION
            });
        } else {
            headerTitleTranslation.value = withTiming(HEADER_TITLE_END_POSITION, {
                duration: HEADER_TITLE_TRANSLATION_DURATION
            });
            buttonTranslation.value = withTiming(SCREEN_WIDTH);
        }
    }, [isSelectionMode]);

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
                    translateX: buttonTranslation.value
                }
            ]
        };
    });

    return { reanimatedHeaderStyles, reanimatedCancelButtonStyles };
};
