import { CANVAS_PADDING_HORIZONTAL, CANVAS_WIDTH } from "@config";
import { moderateScale } from "@constants";
import { getElevation } from "@utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: CANVAS_PADDING_HORIZONTAL
    },
    drawingContainer: {
        width: CANVAS_WIDTH,
        flex: 1,
        borderRadius: moderateScale(12),
        ...getElevation(5)
    },
    canvas: {
        width: CANVAS_WIDTH
    }
});
