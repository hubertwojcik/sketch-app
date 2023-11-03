import { Canvas, fitbox, Group, ImageSVG, rect, Skia } from "@shopify/react-native-skia";
import { Drawing } from "@/types";
import { getElevation, horizontalScale } from "@/utils";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";

import { DRAWINGS_LIST_COLUMNS } from "@/constants";
import { borderRadiusSizes, colors } from "@/ui/theme";
import { Checkmark } from "./checkmark";

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

    return (
        <Pressable onPress={() => onDrawingPress(id, isDeleteMode)} style={styles.tileContainer}>
            {isDeleteMode && (
                <View style={{ position: "absolute", zIndex: 20, right: 10, top: 10 }}>
                    <Checkmark isSelected={isDrawingSelected} />
                    {/* <Text style={{ backgroundColor: "red" }}>{isDrawingSelected && "OK"}</Text> */}
                </View>
            )}
            <View style={styles.tile}>
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
        borderRadius: borderRadiusSizes.thin,
        overflow: "hidden",
        backgroundColor: colors.white
    }
});
