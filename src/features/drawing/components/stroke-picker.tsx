import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import {
    EXTERNAL_STROKE_SIZE,
    INTERNAL_STROKE_SIZE,
    strokes,
    STROKE_PICKER_WIDTH,
    TOOLBAR_SIZE
} from "@/constants";

import { CustomPickerProps } from "@/types";
import { useDrawingEditorStore } from "@/core";
import { AnimatedPicker } from "@/ui";
import { borderRadiusSizes, colors } from "@/ui/theme";

const Stroke = ({ width, onPress }: { width: number; onPress?: (stroke: number) => void }) => {
    return (
        <Pressable onPress={() => onPress && onPress(width)} style={[styles.container, {}]}>
            <View style={[styles.content]}>
                <View style={[styles.stroke, { width }]} />
            </View>
        </Pressable>
    );
};

export const StrokePicker = (props: CustomPickerProps) => {
    const { setStrokeWidth, strokeWidth } = useDrawingEditorStore();

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
        justifyContent: "center",
        backgroundColor: colors.white
    },
    content: {
        width: INTERNAL_STROKE_SIZE,
        height: INTERNAL_STROKE_SIZE,
        transform: [{ rotate: "45deg" }],
        alignItems: "center",
        justifyContent: "center"
    },
    stroke: {
        height: "100%",
        width: 2,
        borderRadius: borderRadiusSizes.thin,
        backgroundColor: colors.black
    }
});
