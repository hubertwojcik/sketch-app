import React from "react";
import { Canvas, fitbox, Group, ImageSVG, rect, Skia } from "@shopify/react-native-skia";
import { useDrawingEditorStore, useDrawingListStore } from "@stores";
import { Drawing } from "@types";
import { getElevation } from "@utils";
import { useRouter } from "expo-router";
import { Pressable, View, StyleSheet, useWindowDimensions } from "react-native";
import spacing from "../constants/spacings";
import { horizontalScale } from "@utils";
import { useTheme } from "@hooks";

type DrawingTileProps = Required<Pick<Drawing, "canvasInfo" | "svg">> & {
    drawingId: string;
};

export default function DrawingTile({ canvasInfo, drawingId, svg }: DrawingTileProps) {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const stringSvg = Skia.SVG.MakeFromString(svg);

    const src = rect(0, 0, canvasInfo.width, canvasInfo.height);

    const dst = rect(0, 0, width / 2 - 30, width / 2 - 30);

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

    const elementWidth = width / 2 - horizontalScale(spacing.xlarge);
    const { colors } = useTheme();

    return (
        <Pressable onPress={changeDrawing} style={styles.tileContainer}>
            <View
                style={[
                    styles.tile,
                    {
                        backgroundColor: colors.white,
                        width: elementWidth
                    }
                ]}
            >
                <Canvas
                    style={{
                        height: elementWidth,
                        width: elementWidth
                    }}
                >
                    {stringSvg && (
                        <Group transform={fitbox("fitHeight", src, dst)}>
                            <ImageSVG svg={stringSvg} width={elementWidth} height={elementWidth} />
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
