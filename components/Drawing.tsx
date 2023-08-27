import Header from "./Header";
import Toolbar from "./Toolbar";

import { useTheme } from "@hooks";
import {
    Canvas,
    Path,
    Skia,
    TouchInfo,
    useCanvasRef,
    useTouchHandler
} from "@shopify/react-native-skia";
import { useDrawingEditorStore } from "@stores";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, View, StyleSheet } from "react-native";
import { CANVAS_PADDING_HORIZONTAL, CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "@constants";
import { getElevation, moderateScale } from "@utils";

export default function Drawing() {
    const [canvasHeight, setCanvasHeight] = useState(DEFAULT_CANVAS_HEIGHT);

    const { localDrawing, color, strokeWidth, setLocalDrawingCanvasInfo, setDrawingPaths } =
        useDrawingEditorStore();

    if (!localDrawing) {
        return null;
    }

    const onLayout = (event: LayoutChangeEvent) => {
        setCanvasHeight(event.nativeEvent.layout.height);
        setLocalDrawingCanvasInfo({
            height: event.nativeEvent.layout.height,
            width: CANVAS_WIDTH
        });
    };

    const onDrawingStart = useCallback(
        (touchInfo: TouchInfo) => {
            const { x, y } = touchInfo;
            const newPath = Skia.Path.Make();
            newPath.moveTo(x, y);
            const newPaths = [
                ...localDrawing.drawingPaths,
                {
                    path: newPath,
                    color: color,
                    strokeWidth: strokeWidth
                }
            ];
            setDrawingPaths(newPaths);
        },
        [localDrawing, setDrawingPaths, color, strokeWidth]
    );

    const onDrawingActive = useCallback(
        (touchInfo: TouchInfo) => {
            const { x, y } = touchInfo;
            const currentPath = localDrawing.drawingPaths[localDrawing.drawingPaths.length - 1];
            const lastPoint = currentPath.path.getLastPt();
            const xMid = (lastPoint.x + x) / 2;
            const yMid = (lastPoint.y + y) / 2;

            currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
            const newPaths = [
                ...localDrawing.drawingPaths.slice(0, localDrawing.drawingPaths.length - 1),
                currentPath
            ];
            setDrawingPaths(newPaths);
        },
        [localDrawing, setDrawingPaths]
    );

    const touchHandler = useTouchHandler(
        {
            onActive: onDrawingActive,
            onStart: onDrawingStart
        },
        [onDrawingActive, onDrawingStart]
    );

    const { colors } = useTheme();
    const canvasRef = useCanvasRef();

    return (
        <>
            <Header />
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
                    ref={canvasRef}
                >
                    {localDrawing.drawingPaths.map((path, idx) => (
                        <Path
                            key={idx}
                            path={path.path}
                            color={path.color}
                            style={"stroke"}
                            strokeWidth={path.strokeWidth}
                        />
                    ))}
                </Canvas>
            </View>
            <Toolbar />
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
