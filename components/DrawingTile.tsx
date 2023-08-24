import React from "react";
import { Canvas, fitbox, Group, ImageSVG, rect, Skia } from "@shopify/react-native-skia";
import { useDrawingStore } from "@stores";
import { Drawing } from "@types";
import { getElevation } from "@utils";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

type DrawingTileProps = Required<Pick<Drawing, "canvasInfo" | "svg">> & {
    width: number;
    drawingId: string;
};

export default function DrawingTile({ canvasInfo, drawingId, svg, width }: DrawingTileProps) {
    const router = useRouter();

    const stringSvg = Skia.SVG.MakeFromString(svg);

    const src = rect(0, 0, canvasInfo.width, canvasInfo.height);

    const dst = rect(0, 0, width / 2 - 30, width / 2 - 30);

    const { setLocalDrawing } = useDrawingStore();

    const changeDrawing = () => {
        setLocalDrawing(drawingId);
        router.push({
            pathname: `(note)/`
        });
    };

    return (
        <Pressable
            onPress={changeDrawing}
            style={{
                ...getElevation(4)
            }}
        >
            <View
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    width: width / 2 - 30,
                    overflow: "hidden"
                }}
            >
                <Canvas
                    style={{
                        height: width / 2 - 30,
                        width: "100%"
                    }}
                >
                    {stringSvg && (
                        <Group transform={fitbox("fitHeight", src, dst)}>
                            <ImageSVG
                                svg={stringSvg}
                                width={width / 2 - 30}
                                height={width / 2 - 30}
                            />
                        </Group>
                    )}
                </Canvas>
            </View>
        </Pressable>
    );
}
