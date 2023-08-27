import { View, StyleSheet, Pressable } from "react-native";
import React, { useRef, useState } from "react";

import { useTheme } from "@hooks";
import { TOOLBAR_HORIZONTAL_SPACING, TOOLBAR_SIZE, TOOLBAR_WIDTH } from "@constants";
import { getElevation, horizontalScale, verticalScale } from "@utils";
import ColorPicker from "./ColorPicker";

export default function Toolbar() {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isStrokePickerOpen, setIsStrokePickerOpen] = useState(false);

    const { colors } = useTheme();

    const toolbarXPositionRef = useRef<number>(0);

    return (
        <>
            {isPickerOpen && (
                <Pressable style={styles.backdrop} onPress={() => setIsPickerOpen(false)} />
            )}
            <View
                style={[styles.wrapper, { backgroundColor: colors.white }]}
                onLayout={({ nativeEvent }) => {
                    toolbarXPositionRef.current = nativeEvent.layout.x;
                }}
            >
                <ColorPicker
                    pickerXPosition={toolbarXPositionRef.current + TOOLBAR_HORIZONTAL_SPACING}
                    isOpen={isPickerOpen}
                    toggleOpen={() => setIsPickerOpen(!isPickerOpen)}
                />

                <View style={styles.divider} />
                <ColorPicker
                    pickerXPosition={toolbarXPositionRef.current + TOOLBAR_HORIZONTAL_SPACING}
                    isOpen={isStrokePickerOpen}
                    toggleOpen={() => setIsStrokePickerOpen(!isPickerOpen)}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 150,
        height: TOOLBAR_SIZE,
        width: TOOLBAR_WIDTH,
        columnGap: TOOLBAR_HORIZONTAL_SPACING,
        flexDirection: "row",
        paddingHorizontal: TOOLBAR_HORIZONTAL_SPACING,
        marginHorizontal: horizontalScale(20),
        justifyItems: "space-between",
        alignItems: "center",
        marginTop: verticalScale(12),
        zIndex: 1,
        ...getElevation(5)
    },
    divider: { height: "75%", width: 1, backgroundColor: "black" },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 1
    }
});
