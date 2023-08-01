import { Header, Toolbar } from "@components";
import { CANVAS_PADDING_HORIZONTAL, CANVAS_WIDTH } from "@config";
import { moderateScale } from "@constants";
import { useTheme } from "@hooks";
import {
    Canvas,
    Path,
    Skia,
    TouchInfo,
    useCanvasRef,
    useTouchHandler
} from "@shopify/react-native-skia";
import { useDrawingStore } from "@stores";
import { Drawing } from "@types";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getElevation } from "../../utils/colors";

export default function EditNote() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { localDrawing, setCanvasInfo, updateLocalDrawing } = useDrawingStore();

    const { drawingPaths, color, strokeWidth } = localDrawing as Drawing;

    const { width } = useWindowDimensions();

    const [canvasHeight, setCanvasHeight] = useState(400);

    const canvasRef = useCanvasRef();

    const onLayout = (event: LayoutChangeEvent) => {
        setCanvasHeight(event.nativeEvent.layout.height);
        //todo
        setCanvasInfo(id as string, { height: event.nativeEvent.layout.height, width: width - 24 });
    };

    const onDrawingStart = useCallback(
        (touchInfo: TouchInfo) => {
            const { x, y } = touchInfo;
            const newPath = Skia.Path.Make();
            newPath.moveTo(x, y);
            const newPaths = [
                ...drawingPaths,
                {
                    path: newPath,
                    color: color,
                    strokeWidth: strokeWidth
                }
            ];
            updateLocalDrawing(newPaths);
        },
        [localDrawing, updateLocalDrawing]
    );

    const onDrawingActive = useCallback(
        (touchInfo: TouchInfo) => {
            const { x, y } = touchInfo;
            const currentPath = drawingPaths[drawingPaths.length - 1];
            const lastPoint = currentPath.path.getLastPt();
            const xMid = (lastPoint.x + x) / 2;
            const yMid = (lastPoint.y + y) / 2;

            currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
            const newPaths = [...drawingPaths.slice(0, drawingPaths.length - 1), currentPath];
            updateLocalDrawing(newPaths);
        },
        [localDrawing, updateLocalDrawing]
    );

    const touchHandler = useTouchHandler(
        {
            onActive: onDrawingActive,
            onStart: onDrawingStart
        },
        [onDrawingActive, onDrawingStart]
    );

    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.grayscale_0 }]}>
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
                    {drawingPaths.map((path, idx) => (
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
        </SafeAreaView>
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
