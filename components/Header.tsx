import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@hooks";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { horizontalScale, verticalScale } from "@constants";
import { useDrawingStore } from "@stores";
import { getElevation, makeSvgFromPaths } from "@utils";

import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "@constants";
import spacings from "../constants/spacings";

export default function Header() {
    const router = useRouter();
    const { colors } = useTheme();
    const { localDrawing, setDrawingSvg, discardLocalDrawing, saveLocalDrawing } =
        useDrawingStore();

    if (!localDrawing) {
        return null;
    }

    const onDrawingSave = () => {
        if (!localDrawing) return;
        const svg =
            drawingPaths &&
            makeSvgFromPaths(drawingPaths, {
                width: canvasInfo.width || DEFAULT_CANVAS_WIDTH,
                height: canvasInfo.height || DEFAULT_CANVAS_HEIGHT
            });
        setDrawingSvg(id, svg);
        saveLocalDrawing();
        router.back();
    };

    const onDrawingDiscard = () => {
        discardLocalDrawing();
        router.back();
    };

    const { drawingPaths, canvasInfo, id } = localDrawing;

    return (
        <View style={[styles.wrapper, { backgroundColor: colors.white }]}>
            <View style={styles.headerRow}>
                <Pressable onPress={onDrawingDiscard} style={styles.headerBackButton}>
                    <Ionicons name="return-up-back-outline" size={24} color="black" />
                </Pressable>
                <Pressable onPress={onDrawingDiscard} style={styles.headerBackButton}>
                    <Ionicons name="return-up-forward" size={24} color="black" />
                </Pressable>
            </View>
            <View style={styles.headerRow}>
                <Pressable onPress={onDrawingDiscard} style={styles.headerBackButton}>
                    <AntDesign name="delete" size={24} color="black" />
                </Pressable>

                <Pressable onPress={onDrawingSave} style={styles.headerBackButton}>
                    <AntDesign name="save" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        borderRadius: spacings.xlarge,
        flexDirection: "row",
        paddingHorizontal: horizontalScale(12),
        marginHorizontal: horizontalScale(20),
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: verticalScale(12),
        ...getElevation(5)
    },
    headerBackButton: {
        paddingHorizontal: horizontalScale(12),
        borderRadius: spacings.large,
        paddingVertical: verticalScale(10)
    },
    headerSaveButton: { paddingVertical: verticalScale(10) },
    headerRow: { flexDirection: "row" }
});
