import React from "react";
import { StyleSheet, View } from "react-native";

import { strokes, STROKE_PICKER_WIDTH, TOOLBAR_SIZE } from "@constants";

import { useTheme } from "@hooks";
import Picker from "./AnimatedPicker";
import Stroke from "./Stroke";
import { CustomPickerProps } from "@types";

const StrokePicker = (props: CustomPickerProps) => {
    const { colors } = useTheme();

    return (
        <Picker
            {...props}
            pickerWidth={STROKE_PICKER_WIDTH}
            toolbarSize={TOOLBAR_SIZE}
            indicatorContent={<Stroke width={4} />}
        >
            <Stroke width={4} />
            <View style={[styles.divider, { backgroundColor: colors.black }]} />
            {strokes.map(i => (
                <Stroke width={i} key={i} />
            ))}
        </Picker>
    );
};
const styles = StyleSheet.create({
    divider: { height: "100%", width: 1 }
});

export default StrokePicker;
