import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@hooks";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { horizontalScale, verticalScale } from "@utils";
import { useDrawingEditorStore, useDrawingListStore } from "@stores";
import { getElevation, makeSvgFromPaths } from "@utils";

import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, ICON_SIZE } from "@constants";
import spacings from "../constants/spacings";

export default function Header() {
    const router = useRouter();
    const { colors } = useTheme();

    const { getDrawingById, updateDrawing, addDrawing } = useDrawingListStore();
    const { localDrawing, discardLocalDrawing } = useDrawingEditorStore();

    if (!localDrawing) {
        return null;
    }

    const onDrawingSave = async () => {
        const drawingExists = getDrawingById(localDrawing.id);

        const svg =
            drawingPaths &&
            (await makeSvgFromPaths(drawingPaths, {
                width: canvasInfo.width || DEFAULT_CANVAS_WIDTH,
                height: canvasInfo.height || DEFAULT_CANVAS_HEIGHT
            }));

        drawingExists
            ? updateDrawing({ ...localDrawing, svg })
            : addDrawing({ ...localDrawing, svg });

        setTimeout(() => {
            router.back();
        }, 1);
    };

    const onDrawingDiscard = () => {
        discardLocalDrawing();
        router.back();
    };

    const { drawingPaths, canvasInfo } = localDrawing;

    return (
        <View style={[styles.wrapper, { backgroundColor: colors.white }]}>
            <View style={styles.headerRow}>
                <Pressable onPress={onDrawingDiscard} style={styles.headerBackButton}>
                    <Ionicons name="return-up-back-outline" size={ICON_SIZE} color={colors.black} />
                </Pressable>
                <Pressable onPress={onDrawingDiscard} style={styles.headerBackButton}>
                    <Ionicons name="return-up-forward" size={ICON_SIZE} color={colors.black} />
                </Pressable>
            </View>
            <View style={styles.headerRow}>
                <Pressable onPress={onDrawingDiscard} style={styles.headerBackButton}>
                    <AntDesign name="delete" size={ICON_SIZE} color={colors.black} />
                </Pressable>

                <Pressable onPress={onDrawingSave} style={styles.headerBackButton}>
                    <AntDesign name="save" size={ICON_SIZE} color={colors.black} />
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
