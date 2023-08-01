import { Drawing } from "@components";
import { useTheme } from "@hooks";
import { useDrawingStore } from "@stores";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewNote() {
    const { createLocalDrawing } = useDrawingStore();

    useEffect(() => {
        createLocalDrawing();
    }, []);

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
        paddingHorizontal: 12
    }
});
