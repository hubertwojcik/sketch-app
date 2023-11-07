import { CANVAS_PADDING_HORIZONTAL } from "@/constants";

import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Drawing } from "@/features";
import { colors } from "@/ui/theme";

export default function DrawingScreen() {
    return (
        <SafeAreaView style={styles.wrapper}>
            <Drawing />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: CANVAS_PADDING_HORIZONTAL,
        backgroundColor: colors.background
    }
});
