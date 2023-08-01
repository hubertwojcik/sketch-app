import { horizontalScale, verticalScale } from "@constants";
import { getElevation } from "@utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
