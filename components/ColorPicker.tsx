import { Colors, COLOR_PICKER_WIDTH, TOOLBAR_SIZE } from "@constants";
import { useTheme } from "@hooks";
import { useDrawingEditorStore } from "@stores";
import { Color, CustomPickerProps } from "@types";
import React from "react";
import { StyleSheet, View } from "react-native";
import Picker from "./AnimatedPicker";
import Dot from "./ColorDot";

const ColorPicker = (props: CustomPickerProps) => {
    const { setColor, color } = useDrawingEditorStore();

    const { colors } = useTheme();

    const chooseColor = (color: Color) => {
        setColor(color);
        props.toggleOpen();
    };

    return (
        <Picker
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
        </Picker>
    );
};
const styles = StyleSheet.create({
    divider: { height: "100%", width: 1 }
});

export default ColorPicker;
