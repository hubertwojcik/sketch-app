import { View } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@hooks";
import { EXTERNAL_STROKE_SIZE, INTERNAL_STROKE_SIZE } from "@constants";

const Stroke = ({ width }: { width: number }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.white }]}>
            <View style={[styles.content]}>
                <View style={[styles.stroke, { width, backgroundColor: colors.black }]} />
            </View>
        </View>
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

export default Stroke;
