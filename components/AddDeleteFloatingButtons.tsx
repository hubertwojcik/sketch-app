import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from "react-native-reanimated";
import { Pressable, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { useDrawingEditorStore } from "@stores";
import { useRouter } from "expo-router";
import { useTheme } from "@hooks";
import {
    ADD_BUTTON_ANIMATION_DELAY,
    ADD_BUTTON_FINAL_BOTTOM,
    ADD_BUTTON_INITIAL_BOTTOM,
    BUTTON_ANIMATION_DURATION,
    DELETE_BUTTON_ANIMATION_DELAY,
    DELETE_BUTTON_FINAL_BOTTOM,
    DELETE_BUTTON_INITIAL_BOTTOM,
    FAB_SIZE,
    ICON_SIZE
} from "@constants";

type AddDeleteFloatingButtonProps = {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
};

const AddDeleteFloatingButtons = ({ isOpen, setIsOpen }: AddDeleteFloatingButtonProps) => {
    const addDrawingValue = useSharedValue(ADD_BUTTON_INITIAL_BOTTOM);
    const deleteDrawingValue = useSharedValue(DELETE_BUTTON_INITIAL_BOTTOM);

    const config = {
        easing: Easing.bezier(0.67, -0.6, 0.32, 1.6),
        duration: BUTTON_ANIMATION_DURATION
    };
    const router = useRouter();

    const { createLocalDrawing } = useDrawingEditorStore();

    const createNewDrawing = () => {
        setIsOpen(!isOpen);
        createLocalDrawing();
        setTimeout(() => {
            router.push({
                pathname: "(note)/"
            });
        }, BUTTON_ANIMATION_DURATION);
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

    const onFloatingPress = () => {
        openAnimation(isOpen);
        setIsOpen(!isOpen);
    };

    const rAddDrawingStyles = useAnimatedStyle(() => {
        const scale = interpolate(
            addDrawingValue.value,
            [ADD_BUTTON_INITIAL_BOTTOM, ADD_BUTTON_FINAL_BOTTOM],
            [0, 1],
            Extrapolate.CLAMP
        );
        return { bottom: addDrawingValue.value, transform: [{ scale }] };
    });

    const rDeleteDrawingStyles = useAnimatedStyle(() => {
        const scale = interpolate(
            deleteDrawingValue.value,
            [DELETE_BUTTON_INITIAL_BOTTOM, DELETE_BUTTON_FINAL_BOTTOM],
            [0, 1],
            Extrapolate.CLAMP
        );
        return { bottom: deleteDrawingValue.value, transform: [{ scale }] };
    });

    const { colors } = useTheme();

    return (
        <>
            <View style={styles.container}>
                <Animated.View style={[styles.contentContainer, rDeleteDrawingStyles]}>
                    <Pressable style={styles.iconContainer}>
                        <Entypo name="trash" size={ICON_SIZE} color={colors.white} />
                    </Pressable>
                </Animated.View>
                <Animated.View style={[styles.contentContainer, rAddDrawingStyles]}>
                    <Pressable style={styles.iconContainer} onPress={createNewDrawing}>
                        <Entypo name="plus" size={ICON_SIZE} color={colors.white} />
                    </Pressable>
                </Animated.View>

                <Pressable onPress={onFloatingPress} style={styles.fabContainer}>
                    <View style={styles.iconContainer}>
                        <Entypo name="dots-three-vertical" size={ICON_SIZE} color={colors.white} />
                    </View>
                </Pressable>
            </View>
        </>
    );
};

export default AddDeleteFloatingButtons;

const styles = StyleSheet.create({
    container: {
        zIndex: 10
    },
    contentContainer: {
        backgroundColor: "#0f56b3",
        position: "absolute",
        bottom: ADD_BUTTON_INITIAL_BOTTOM,
        borderRadius: FAB_SIZE
    },
    iconContainer: {
        height: FAB_SIZE,
        width: FAB_SIZE,
        justifyContent: "center",
        alignItems: "center"
    },
    fabContainer: {
        width: FAB_SIZE,
        backgroundColor: "#0f56b3",
        borderRadius: FAB_SIZE / 2
    }
});
