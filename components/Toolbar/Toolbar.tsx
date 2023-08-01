import { View, Text } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useTheme } from "@hooks";

export default function Toolbar() {
    const { colors } = useTheme();

    return (
        <View style={[styles.wrapper, { backgroundColor: colors.white }]}>
            <Text>Toolbar</Text>
        </View>
    );
}
