import {
    CIRCLE_ICON_INITIAL_VISIBILITY,
    CIRCLE_ICON_VISIBILITY_DURATION,
    CIRCLE_INITIAL_ROTATION,
    CIRCLE_INITIAL_TRANSLATION,
    CIRCLE_ROTATION_DURATION,
    CIRCLE_TRANSLATION_DELAY,
    CIRCLE_TRANSLATION_DURATION
} from "@/constants";
import { Text } from "@/ui";
import { colors } from "@/ui/theme";
import { getElevation, moderateScale, verticalScale } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";

import { useWindowDimensions } from "react-native";

import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const CIRCLE_SIZE = 85;

export default function Splash() {
    const rotation = useSharedValue(CIRCLE_INITIAL_ROTATION);
    const iconVisibility = useSharedValue(CIRCLE_ICON_INITIAL_VISIBILITY);
    const translation = useSharedValue(CIRCLE_INITIAL_TRANSLATION);

    const router = useRouter();

    const enterApp = () => {
        router.replace("drawings");
    };

    const onEnterIconPress = () => {
        rotation.value = withTiming(1, {
            duration: CIRCLE_ROTATION_DURATION,
            easing: Easing.bounce
        });
        iconVisibility.value = withTiming(0, { duration: CIRCLE_ICON_VISIBILITY_DURATION });
        translation.value = withDelay(
            CIRCLE_TRANSLATION_DELAY,
            withTiming(
                width,
                {
                    duration: CIRCLE_TRANSLATION_DURATION,
                    easing: Easing.bounce
                },
                finished => {
                    if (finished) {
                        runOnJS(enterApp)();
                    }
                }
            )
        );
    };

    const circleAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateY: `${interpolate(rotation.value, [0, 0.5, 1], [0, -90, -180])}deg`
                },
                {
                    translateX: translation.value
                }
            ]
        };
    });

    const iconAnimatedStyles = useAnimatedStyle(() => {
        return {
            opacity: iconVisibility.value
        };
    });

    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
                <View style={styles.titleContainer}>
                    <Text variant="heading1">Welcome</Text>
                </View>
                <Animated.View style={[styles.circle, circleAnimatedStyles]}>
                    <Pressable onPress={onEnterIconPress}>
                        <View style={[styles.circle, styles.circleButton]}>
                            <Animated.View style={iconAnimatedStyles}>
                                <AntDesign name="arrowright" size={32} />
                            </Animated.View>
                        </View>
                    </Pressable>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start"
    },
    titleContainer: { flex: 1, paddingTop: 100 },
    circleContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: moderateScale(8),
        paddingBottom: verticalScale(100),
        backgroundColor: colors.background
    },
    circle: {
        backgroundColor: colors.accent,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        ...getElevation(10)
    },
    circleButton: {
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center"
    }
});
