import { Drawing } from "@components";
import { CANVAS_PADDING_HORIZONTAL } from "@config";
import { useTheme } from "@hooks";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditNote() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.grayscale_0 }]}>
            <Drawing id={id as string} />
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
