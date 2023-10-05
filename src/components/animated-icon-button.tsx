import { StyleSheet, Pressable, ViewStyle } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { ADD_BUTTON_INITIAL_BOTTOM, FAB_SIZE, ICON_SIZE } from "@/constants";
import { useTheme } from "@/core";

type AnimatedIconButtonProps = {
    onPress: () => void;
    iconName: React.ComponentProps<typeof Entypo>["name"];
    reanimatedStyles?: ViewStyle;
};

export const AnimatedIconButton = ({
    onPress,
    reanimatedStyles,
    iconName
}: AnimatedIconButtonProps) => {
    const { colors } = useTheme();
    return (
        <Animated.View style={[styles.contentContainer, reanimatedStyles]}>
            <Pressable style={styles.iconContainer} onPress={onPress}>
                <Entypo name={iconName} size={ICON_SIZE} color={colors.white} />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
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
    }
});
