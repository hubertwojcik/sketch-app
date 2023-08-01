import { Header, Toolbar } from "@components";
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
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getElevation } from "../../utils/colors";

export default function NewNote() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { localDrawing, createLocalDrawing, updateLocalDrawing, setCanvasInfo } =
        useDrawingStore();

    useEffect(() => {
        createLocalDrawing();
    }, []);

    const { width } = useWindowDimensions();

    const [canvasHeight, setCanvasHeight] = useState(400);

    const canvasRef = useCanvasRef();

    const onLayout = (event: LayoutChangeEvent) => {
        setCanvasHeight(event.nativeEvent.layout.height);
        setCanvasInfo(id as string, { height: event.nativeEvent.layout.height, width: width - 24 });
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

    return (
        <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.grayscale_0 }]}>
            <Header />
            <View
                onLayout={onLayout}
                style={{
                    width: width - 24,
                    flex: 1,
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    ...getElevation(5)
                }}
            >
                <Canvas
                    onTouch={touchHandler}
                    style={{
                        height: canvasHeight,
                        width: width - 24
                    }}
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 12
    }
});
