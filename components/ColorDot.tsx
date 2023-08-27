import { getElevation } from "@utils";
import { Pressable, View } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@hooks";
import { EXTERNAL_DOT_SIZE, INTERNAL_DOT_SIZE } from "@constants";
import { Color } from "@types";

const Dot = ({ color, onPress }: { color: Color; onPress: (color: Color) => void }) => {
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={() => onPress(color)}
            style={[styles.container, { backgroundColor: colors.white }]}
        >
            <View style={[styles.content, { backgroundColor: color }]}></View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: EXTERNAL_DOT_SIZE,
        height: EXTERNAL_DOT_SIZE,
        borderRadius: EXTERNAL_DOT_SIZE,
        alignItems: "center",
        justifyContent: "center",
        ...getElevation(5)
    },
    content: {
        width: INTERNAL_DOT_SIZE,
        height: INTERNAL_DOT_SIZE,
        borderRadius: INTERNAL_DOT_SIZE,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Dot;
