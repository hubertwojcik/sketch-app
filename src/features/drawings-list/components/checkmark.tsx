import { CHECKMARK_ICON_SIZE, CHECKMARK_INNER_IMAGE_SIZE } from "@/constants";
import { colors } from "@/ui/theme";

import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useCheckmarkAnimation } from "../animations";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const checkmarkIcon = require("../../../../assets/images/check.png");

export const Checkmark = ({ isSelected }: { isSelected: boolean }) => {
    const { checkmarkIconStyles } = useCheckmarkAnimation(isSelected);
    return (
        <Animated.View style={[styles.iconContainer, checkmarkIconStyles]}>
            <View style={styles.iconContent}>
                {<Image style={styles.icon} source={checkmarkIcon} />}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        width: CHECKMARK_ICON_SIZE,
        height: CHECKMARK_ICON_SIZE,
        borderRadius: CHECKMARK_ICON_SIZE / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.accent
    },
    iconContent: {
        width: CHECKMARK_ICON_SIZE,
        height: CHECKMARK_ICON_SIZE,
        borderRadius: CHECKMARK_ICON_SIZE / 2,
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        width: CHECKMARK_INNER_IMAGE_SIZE,
        height: CHECKMARK_INNER_IMAGE_SIZE
    }
});
