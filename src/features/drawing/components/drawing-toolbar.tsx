import { View, StyleSheet } from "react-native";
import React, { useCallback, useRef, useState } from "react";

import { TOOLBAR_HORIZONTAL_SPACING, TOOLBAR_SIZE, TOOLBAR_WIDTH } from "@/constants";
import { getElevation, verticalScale } from "@/utils";
import { Backdrop } from "@/ui";
import { ColorPicker } from "./color-picker";
import { StrokePicker } from "./stroke-picker";
import { colors } from "@/ui/theme";

export function DrawingToolbar() {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isStrokePickerOpen, setIsStrokePickerOpen] = useState(false);

    const toolbarXPositionRef = useRef<number>(0);

    const onBackdropPress = useCallback(() => {
        setIsColorPickerOpen(false);
        setIsStrokePickerOpen(false);
    }, []);

    const togglePicker = useCallback((colorPicker = false, strokePicker = false) => {
        setIsColorPickerOpen(colorPicker);
        setIsStrokePickerOpen(strokePicker);
    }, []);

    const onColorPickerPress = useCallback(() => {
        togglePicker(!isColorPickerOpen, false);
    }, [isColorPickerOpen]);

    const onStrokePickerPress = useCallback(() => {
        togglePicker(false, !isStrokePickerOpen);
    }, [isStrokePickerOpen]);

    return (
        <>
            {(isColorPickerOpen || isStrokePickerOpen) && (
                <Backdrop onBackdropPress={onBackdropPress} backgroundColor="rgba(0, 0, 0, 0.2)" />
            )}
            <View
                style={[styles.wrapper, {}]}
                onLayout={({ nativeEvent }) => {
                    toolbarXPositionRef.current = nativeEvent.layout.x;
                }}
            >
                <ColorPicker
                    pickerXPosition={toolbarXPositionRef.current + TOOLBAR_HORIZONTAL_SPACING}
                    isOpen={isColorPickerOpen}
                    toggleOpen={onColorPickerPress}
                />
                <View style={styles.divider} />
                <StrokePicker
                    pickerXPosition={
                        toolbarXPositionRef.current + TOOLBAR_HORIZONTAL_SPACING + TOOLBAR_WIDTH / 2
                    }
                    isOpen={isStrokePickerOpen}
                    toggleOpen={onStrokePickerPress}
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

        justifyItems: "space-between",
        alignItems: "center",
        marginTop: verticalScale(12),
        zIndex: 1,
        backgroundColor: colors.white,
        ...getElevation(5)
    },
    divider: { height: "75%", width: 1, backgroundColor: "black" }
});
