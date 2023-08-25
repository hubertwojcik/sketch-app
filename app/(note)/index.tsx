import { Drawing } from "@components";
import { CANVAS_PADDING_HORIZONTAL } from "@constants";

import { useTheme } from "@hooks";

import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Note() {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.grayscale_0 }]}>
            <Drawing />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: CANVAS_PADDING_HORIZONTAL
    }
});
