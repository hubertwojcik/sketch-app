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
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: verticalScale(12),
        ...getElevation(5)
    },
    headerBackButton: {
        paddingVertical: verticalScale(10)
    },
    headerSaveButton: { paddingVertical: verticalScale(10) }
});
