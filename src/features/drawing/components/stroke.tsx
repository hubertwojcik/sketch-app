import { Pressable, View } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@/core";
import { EXTERNAL_STROKE_SIZE, INTERNAL_STROKE_SIZE } from "@/constants";

export const Stroke = ({
    width,
    onPress
}: {
    width: number;
    onPress?: (stroke: number) => void;
}) => {
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={() => onPress && onPress(width)}
            style={[styles.container, { backgroundColor: colors.white }]}
        >
            <View style={[styles.content]}>
                <View style={[styles.stroke, { width, backgroundColor: colors.black }]} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: EXTERNAL_STROKE_SIZE,
        height: EXTERNAL_STROKE_SIZE,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        width: INTERNAL_STROKE_SIZE,
        height: INTERNAL_STROKE_SIZE,
        transform: [{ rotate: "45deg" }],
        alignItems: "center",
        justifyContent: "center"
    },
    stroke: { height: "100%", width: 2, borderRadius: 10 }
});
