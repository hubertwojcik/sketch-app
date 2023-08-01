import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { useTheme } from "@hooks";
import { horizontalScale, verticalScale } from "@constants";
import { getElevation } from "@utils";

export default function Toolbar() {
    const { colors } = useTheme();

    return (
        <View style={[styles.wrapper, { backgroundColor: colors.white }]}>
            <Text>Toolbar</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        width: "100%",
        borderRadius: 100,
        flexDirection: "row",
        paddingHorizontal: horizontalScale(12),
        marginHorizontal: horizontalScale(20),
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(12),
        ...getElevation(5)
    }
});
