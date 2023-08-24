import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useTheme } from "@hooks";

import { useDrawingStore } from "@stores";
import { getElevation, makeSvgFromPaths } from "@utils";
import { horizontalScale, verticalScale } from "@constants";
import { Drawing } from "@types";

export default function Header() {
    const router = useRouter();
    const { colors } = useTheme();
    const { localDrawing, setDrawingSvg, discardLocalDrawing, saveLocalDrawing } =
        useDrawingStore();

    if (!localDrawing) {
        return null;
    }

    const { drawingPaths, canvasInfo, id } = localDrawing as Drawing;

    return (
        <View style={[styles.wrapper, { backgroundColor: colors.white }]}>
            <Pressable
                onPress={() => {
                    discardLocalDrawing();
                    router.back();
                }}
                style={styles.headerBackButton}
            >
                <Text>Go back</Text>
            </Pressable>

            <Pressable
                onPress={() => {
                    if (!localDrawing) return;
                    const svg =
                        drawingPaths &&
                        makeSvgFromPaths(drawingPaths, {
                            width: canvasInfo.width || 300,
                            height: canvasInfo.height || 600
                        });
                    setDrawingSvg(id, svg);
                    saveLocalDrawing();
                    router.back();
                }}
                style={styles.headerSaveButton}
            >
                <Text>Save</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        width: "100%",
        borderRadius: 100,
        flexDirection: "row",
        paddingHorizontal: horizontalScale(12),
        marginHorizontal: horizontalScale(20),
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: verticalScale(12),
        ...getElevation(5)
    },
    headerBackButton: {
        paddingVertical: verticalScale(10)
    },
    headerSaveButton: { paddingVertical: verticalScale(10) }
});
