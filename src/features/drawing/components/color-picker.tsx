import {
    PickerColors,
    COLOR_PICKER_WIDTH,
    EXTERNAL_DOT_SIZE,
    INTERNAL_DOT_SIZE,
    TOOLBAR_SIZE
} from "@/constants";

import { useDrawingEditorStore } from "@/core";
import { PickerColor, CustomPickerProps } from "@/types";
import { getElevation } from "@/utils";
import { AnimatedPicker } from "@/ui";

import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "@/ui/theme";

const Dot = ({ color, onPress }: { color: PickerColor; onPress: (color: PickerColor) => void }) => {
    return (
        <Pressable onPress={() => onPress(color)} style={styles.container}>
            <View style={[styles.content, { backgroundColor: color }]}></View>
        </Pressable>
    );
};

export const ColorPicker = (props: CustomPickerProps) => {
    const { setColor, color } = useDrawingEditorStore();

    const chooseColor = (color: PickerColor) => {
        setColor(color);
        props.toggleOpen();
    };

    return (
        <AnimatedPicker
            {...props}
            pickerWidth={COLOR_PICKER_WIDTH}
            toolbarSize={TOOLBAR_SIZE}
            indicatorContent={<Dot onPress={props.toggleOpen} color={color} />}
        >
            <Dot color={color} onPress={props.toggleOpen} />
            <View style={styles.divider} />

            {PickerColors.map(i => (
                <Dot color={i} key={i} onPress={chooseColor} />
            ))}
        </AnimatedPicker>
    );
};

const styles = StyleSheet.create({
    container: {
        width: EXTERNAL_DOT_SIZE,
        height: EXTERNAL_DOT_SIZE,
        borderRadius: EXTERNAL_DOT_SIZE,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        ...getElevation(5)
    },
    divider: { height: "100%", width: 1, backgroundColor: colors.black },
    content: {
        width: INTERNAL_DOT_SIZE,
        height: INTERNAL_DOT_SIZE,
        borderRadius: INTERNAL_DOT_SIZE,
        alignItems: "center",
        justifyContent: "center"
    }
});
