import { CANVAS_PADDING_HORIZONTAL, CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "@/constants";
import { useTheme } from "@/core";
import {
    Canvas,
    Path,
    Skia,
    useCanvasRef,
    useTouchHandler,
    useValue
} from "@shopify/react-native-skia";
import { useDrawingEditorStore } from "@/core";
import { getElevation, moderateScale } from "@/utils";
import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { DrawingHeader, DrawingToolbar } from "./components";

export function Drawing() {
    const [canvasHeight, setCanvasHeight] = useState(DEFAULT_CANVAS_HEIGHT);

    const { localDrawing, color, strokeWidth, setLocalDrawingCanvasInfo, setDrawingPaths } =
        useDrawingEditorStore();

    const drawRef = useCanvasRef();
    const path = useValue(Skia.Path.Make());
    const paint = useValue(Skia.Paint());

    const onLayout = (event: LayoutChangeEvent) => {
        setCanvasHeight(event.nativeEvent.layout.height);
        setLocalDrawingCanvasInfo({
            height: event.nativeEvent.layout.height,
            width: CANVAS_WIDTH
        });
    };

    const touchHandler = useTouchHandler(
        {
            onStart: ({ x, y }) => {
                path.current.moveTo(x, y);
                paint.current.setStrokeWidth(strokeWidth);
                paint.current.setColor(Skia.Color(color));
            },
            onActive: ({ x, y }) => {
                const lastPt = path.current.getLastPt();
                const xMid = (lastPt.x + x) / 2;
                const yMid = (lastPt.y + y) / 2;
                path.current.quadTo(lastPt.x, lastPt.y, xMid, yMid);
            },
            onEnd: () => {
                const currentPath = {
                    path: path.current.copy(),
                    paint: paint.current.copy(),
                    color
                };
                setDrawingPaths(currentPath);

                path.current.reset();
                paint.current.reset();
            }
        },
        [localDrawing?.drawingPaths, color, strokeWidth]
    );
    const { colors } = useTheme();

    return (
        <>
            <DrawingHeader />
            <View
                onLayout={onLayout}
                style={[styles.drawingContainer, { backgroundColor: colors.white }]}
            >
                <Canvas
                    onTouch={touchHandler}
                    style={[
                        styles.canvas,
                        {
                            height: canvasHeight
                        }
                    ]}
                    ref={drawRef}
                >
                    {localDrawing?.drawingPaths?.map((line, index) => (
                        <Path
                            key={`line_${line.path.toSVGString()}_${index}`}
                            style="stroke"
                            strokeJoin="round"
                            strokeCap="round"
                            path={line.path}
                            paint={line.paint}
                            strokeWidth={line.paint.getStrokeWidth()}
                            color={line.paint.getColor()}
                        />
                    ))}
                    <Path
                        path={path}
                        strokeWidth={strokeWidth}
                        color={color}
                        style="stroke"
                        strokeJoin="round"
                        strokeCap="round"
                    />
                </Canvas>
            </View>
            <DrawingToolbar />
        </>
    );
}

const styles = StyleSheet.create({
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
