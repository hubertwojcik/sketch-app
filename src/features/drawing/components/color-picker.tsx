import {
    Colors,
    COLOR_PICKER_WIDTH,
    EXTERNAL_DOT_SIZE,
    INTERNAL_DOT_SIZE,
    TOOLBAR_SIZE
} from "@/constants";
import { useTheme } from "@/core";
import { useDrawingEditorStore } from "@/core";
import { Color, CustomPickerProps } from "@/types";
import { getElevation } from "@/utils";
import { AnimatedPicker } from "@/components";

import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const Dot = ({ color, onPress }: { color: Color; onPress: (color: Color) => void }) => {
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={() => onPress(color)}
            style={[styles.container, { backgroundColor: colors.white }]}
        >
            <View style={[styles.content, { backgroundColor: color }]}></View>
        </Pressable>
    );
};

export const ColorPicker = (props: CustomPickerProps) => {
    const { setColor, color } = useDrawingEditorStore();

    const { colors } = useTheme();

    const chooseColor = (color: Color) => {
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
            <View style={[styles.divider, { backgroundColor: colors.black }]} />

            {Colors.map(i => (
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
        ...getElevation(5)
    },
    divider: { height: "100%", width: 1 },
    content: {
        width: INTERNAL_DOT_SIZE,
        height: INTERNAL_DOT_SIZE,
        borderRadius: INTERNAL_DOT_SIZE,
        alignItems: "center",
        justifyContent: "center"
    }
});
