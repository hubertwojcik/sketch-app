import React, { useMemo } from "react";
import { Canvas, fitbox, Group, ImageSVG, rect, Skia } from "@shopify/react-native-skia";
import { useDrawingEditorStore, useDrawingListStore } from "@stores";
import { Drawing } from "@types";
import { getElevation, horizontalScale } from "@utils";
import { useRouter } from "expo-router";
import { Pressable, View, StyleSheet, useWindowDimensions } from "react-native";
import spacing from "../constants/spacings";

import { useTheme } from "@hooks";
import { DRAWINGS_LIST_COLUMNS } from "@constants";

type DrawingTileProps = Required<Pick<Drawing, "canvasInfo" | "svg">> & {
    drawingId: string;
};

export default function DrawingTile({ canvasInfo, drawingId, svg }: DrawingTileProps) {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const { getDrawingById } = useDrawingListStore();
    const { setLocalDrawing } = useDrawingEditorStore();

    const changeDrawing = () => {
        const drawing = getDrawingById(drawingId);
        if (!drawing) return;
        setLocalDrawing(drawing);
        router.push({
            pathname: `(note)/`
        });
    };

    const src = rect(0, 0, canvasInfo.width, canvasInfo.height);

    const dstWidth = width / DRAWINGS_LIST_COLUMNS - horizontalScale(30);

    const dstHeight = (dstWidth * canvasInfo.height) / canvasInfo.width;

    const dst = rect(0, 0, dstWidth, dstHeight);

    const stringSvg = useMemo(() => Skia.SVG.MakeFromString(svg), [svg]);

    const { colors } = useTheme();

    return (
        <Pressable onPress={changeDrawing} style={styles.tileContainer}>
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
        ...getElevation(4)
    },
    tile: {
        borderRadius: spacing.small,
        overflow: "hidden"
    }
});
