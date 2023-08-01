import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { useTheme } from "@hooks";

import { useDrawingStore } from "@stores";
import { makeSvgFromPaths } from "@utils";

export default function Header() {
    const router = useRouter();
    const { colors } = useTheme();
    const {
        localDrawing,

        setDrawingSvg,
        discardLocalDrawing,
        saveLocalDrawing
    } = useDrawingStore();

    const { drawingPaths, canvasInfo, id } = localDrawing;

    return (
        <View style={[styles.wrapper, { backgroundColor: colors.white }]}>
            <Pressable
                onPress={() => {
                    discardLocalDrawing();
                    router.back();
                }}
                style={styles.headerBackButton}
            >
                <Text>Go back</Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    const svg =
                        drawingPaths &&
                        makeSvgFromPaths(drawingPaths, {
                            width: canvasInfo.width || 300,
                            height: canvasInfo.height || 600
                        });
                    setDrawingSvg(id as string, svg);
                    saveLocalDrawing();
                    router.back();
                }}
                style={styles.headerSaveButton}
            >
                <Text>Save</Text>
            </Pressable>
        </View>
    );
}
