import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    wrapper: { flex: 1, height: 60 },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        width: 45,
        height: 45,
        borderRadius: 25,

        borderColor: "grey",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25
    },
    text: {
        fontSize: 12,
        textAlign: "center",
        color: "black",
        marginTop: 3,
        fontWeight: "500"
    }
});
