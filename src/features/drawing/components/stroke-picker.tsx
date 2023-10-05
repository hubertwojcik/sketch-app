import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import {
    EXTERNAL_STROKE_SIZE,
    INTERNAL_STROKE_SIZE,
    strokes,
    STROKE_PICKER_WIDTH,
    TOOLBAR_SIZE
} from "@/constants";

import { useTheme } from "@/core";

import { CustomPickerProps } from "@/types";
import { useDrawingEditorStore } from "@/core";
import { AnimatedPicker } from "@/components";

const Stroke = ({ width, onPress }: { width: number; onPress?: (stroke: number) => void }) => {
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={() => onPress && onPress(width)}
            style={[styles.container, { backgroundColor: colors.white }]}
        >
            <View style={[styles.content]}>
                <View style={[styles.stroke, { width, backgroundColor: colors.black }]} />
            </View>
        </Pressable>
    );
};

export const StrokePicker = (props: CustomPickerProps) => {
    const { setStrokeWidth, strokeWidth } = useDrawingEditorStore();
    const { colors } = useTheme();

    const chooseStroke = (stroke: number) => {
        setStrokeWidth(stroke);
        props.toggleOpen();
    };

    return (
        <AnimatedPicker
            {...props}
            pickerWidth={STROKE_PICKER_WIDTH}
            toolbarSize={TOOLBAR_SIZE}
            toggleOpen={props.toggleOpen}
            indicatorContent={<Stroke width={strokeWidth} onPress={props.toggleOpen} />}
        >
            <Stroke
                width={strokeWidth}
                onPress={() => {
                    props.toggleOpen();
                }}
            />

            <View style={[styles.divider, { backgroundColor: colors.black }]} />
            {strokes.map(i => (
                <Stroke onPress={chooseStroke} width={i} key={i} />
            ))}
        </AnimatedPicker>
    );
};

const styles = StyleSheet.create({
    divider: { height: "100%", width: 1 },
    container: {
        width: EXTERNAL_STROKE_SIZE,
        height: EXTERNAL_STROKE_SIZE,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        width: INTERNAL_STROKE_SIZE,
        height: INTERNAL_STROKE_SIZE,
        transform: [{ rotate: "45deg" }],
        alignItems: "center",
        justifyContent: "center"
    },
    stroke: { height: "100%", width: 2, borderRadius: 10 }
});
