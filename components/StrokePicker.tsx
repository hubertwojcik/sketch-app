import React from "react";
import { StyleSheet, View } from "react-native";

import { strokes, STROKE_PICKER_WIDTH, TOOLBAR_SIZE } from "@constants";

import { useTheme } from "@hooks";
import Picker from "./AnimatedPicker";
import Stroke from "./Stroke";
import { CustomPickerProps } from "@types";
import { useDrawingEditorStore } from "@stores";

const StrokePicker = (props: CustomPickerProps) => {
    const { setStrokeWidth, strokeWidth } = useDrawingEditorStore();
    const { colors } = useTheme();

    const chooseStroke = (stroke: number) => {
        setStrokeWidth(stroke);
        props.toggleOpen();
    };

    return (
        <Picker
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
        </Picker>
    );
};
const styles = StyleSheet.create({
    divider: { height: "100%", width: 1 }
});

export default StrokePicker;
