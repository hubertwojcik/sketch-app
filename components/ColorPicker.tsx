import { Colors, COLOR_PICKER_WIDTH, TOOLBAR_SIZE } from "@constants";
import { useTheme } from "@hooks";
import { CustomPickerProps } from "@types";
import React from "react";
import { StyleSheet, View } from "react-native";
import Picker from "./AnimatedPicker";
import Dot from "./ColorDot";

const ColorPicker = (props: CustomPickerProps) => {
    const { colors } = useTheme();

    return (
        <Picker
            {...props}
            pickerWidth={COLOR_PICKER_WIDTH}
            toolbarSize={TOOLBAR_SIZE}
            indicatorContent={<Dot color="black" />}
        >
            <Dot color="black" />
            <View style={[styles.divider, { backgroundColor: colors.black }]} />

            {Colors.map(i => (
                <Dot color={i} key={i} />
            ))}
        </Picker>
    );
};
const styles = StyleSheet.create({
    divider: { height: "100%", width: 1 }
});

export default ColorPicker;
