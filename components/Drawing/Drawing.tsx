import { Header } from "../Header";
import { Toolbar } from "../Toolbar";
import { CANVAS_WIDTH } from "@config";
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
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { styles } from "./styles";

type DrawingProps = {
    id?: string;
};

export default function Drawing({ id }: DrawingProps) {
    const [canvasHeight, setCanvasHeight] = useState(400);

    const { localDrawing, setCanvasInfo, updateLocalDrawing } = useDrawingStore();

    const onLayout = (event: LayoutChangeEvent) => {
        setCanvasHeight(event.nativeEvent.layout.height);
        setCanvasInfo(id as string, {
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
                    color: localDrawing.color,
                    strokeWidth: localDrawing.strokeWidth
                }
            ];
            updateLocalDrawing(newPaths);
        },
        [localDrawing, updateLocalDrawing]
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
