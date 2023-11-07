import { AntDesign } from "@expo/vector-icons";

import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { getElevation, horizontalScale, moderateScale, verticalScale } from "@/utils";

import { ICON_SIZE } from "@/constants";
import { useDrawingHeader } from "../hooks";
import { colors, Spacings } from "@/ui/theme";

export function DrawingHeader() {
    const { onDrawingDiscard, onDrawingSave } = useDrawingHeader();

    return (
        <View style={styles.wrapper}>
            <Pressable onPress={onDrawingDiscard} style={styles.headerButton}>
                <AntDesign name="delete" size={ICON_SIZE} color={colors.black} />
            </Pressable>

            <Pressable onPress={onDrawingSave} style={styles.headerButton}>
                <AntDesign name="save" size={ICON_SIZE} color={colors.black} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        borderRadius: moderateScale(Spacings.xlarge),
        flexDirection: "row",
        paddingHorizontal: horizontalScale(12),
        marginHorizontal: horizontalScale(20),
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: verticalScale(12),
        columnGap: horizontalScale(20),
        backgroundColor: colors.white,
        ...getElevation(5)
    },
    headerButton: {
        paddingHorizontal: horizontalScale(10),
        borderRadius: Spacings.large,
        paddingVertical: verticalScale(10)
    },
    headerSaveButton: { paddingVertical: verticalScale(10) }
});
