import { Canvas, fitbox, Group, ImageSVG, rect, Skia } from "@shopify/react-native-skia";
import { Drawing } from "@/types";
import { getElevation, horizontalScale } from "@/utils";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { DRAWINGS_LIST_COLUMNS, Spacings } from "@/constants";
import { useTheme } from "@/core";

type DrawingTileProps = Required<Omit<Drawing, "drawingPaths">> & {
    onDrawingPress: (id: string, isDeleteMode: boolean) => void;
    isDrawingSelected: boolean;
    isDeleteMode: boolean;
};

export function DrawingTile({
    canvasInfo,
    id,
    svg,
    onDrawingPress,
    isDrawingSelected,
    isDeleteMode
}: DrawingTileProps) {
    const { width } = useWindowDimensions();

    const src = rect(0, 0, canvasInfo.width, canvasInfo.height);

    const dstWidth = width / DRAWINGS_LIST_COLUMNS - horizontalScale(30);

    const dstHeight = (dstWidth * canvasInfo.height) / canvasInfo.width;

    const dst = rect(0, 0, dstWidth, dstHeight);

    const stringSvg = useMemo(() => Skia.SVG.MakeFromString(svg), [svg]);

    const { colors } = useTheme();

    return (
        <Pressable onPress={() => onDrawingPress(id, isDeleteMode)} style={styles.tileContainer}>
            {isDeleteMode && (
                <View style={{ position: "absolute", zIndex: 20, right: 0 }}>
                    <Text style={{ backgroundColor: "red" }}>{isDrawingSelected && "OK"}</Text>
                </View>
            )}
            <View
                style={[
                    styles.tile,
                    {
                        backgroundColor: colors.white
                    }
                ]}
            >
                <Canvas
                    style={{
                        height: dstHeight,
                        width: dstWidth
                    }}
                >
                    {stringSvg && (
                        <Group transform={fitbox("fitHeight", src, dst)}>
                            <ImageSVG svg={stringSvg} width={dstWidth} height={dstHeight} />
                        </Group>
                    )}
                </Canvas>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tileContainer: {
        position: "relative",
        ...getElevation(4)
    },
    tile: {
        borderRadius: Spacings.small,
        overflow: "hidden"
    }
});
