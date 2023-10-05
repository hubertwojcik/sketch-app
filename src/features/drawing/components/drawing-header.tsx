import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { getElevation, horizontalScale, verticalScale } from "@/utils";

import { ICON_SIZE, Spacings } from "@/constants";
import { useDrawingHeader } from "../hooks";

export function DrawingHeader() {
    const { colors } = useTheme();
    const { onDrawingDiscard, onDrawingSave } = useDrawingHeader();

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
        borderRadius: Spacings.xlarge,
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
        borderRadius: Spacings.large,
        paddingVertical: verticalScale(10)
    },
    headerSaveButton: { paddingVertical: verticalScale(10) },
    headerRow: { flexDirection: "row" }
});