import { getElevation, horizontalScale } from "@/utils";
import { useDrawingListStore } from "@/core";

import React, { useEffect } from "react";

import { StyleSheet, Text, Pressable, FlatList, View } from "react-native";

import { Backdrop } from "@/components";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from "react-native-reanimated";
import { InteractionMode } from "@/types";
import { FloatingActionsButton } from "./components";
import { useDrawingsList } from "./hooks/";
import { DRAWINGS_LIST_COLUMNS, Spacings } from "@/constants";
import { DrawingTile } from "./components/drawing-tile";

const useDeleteToolbarAnimation = (isSelectionMode: boolean) => {
    const deleteToolbarHeight = useSharedValue(0);
    const floatingPosition = useSharedValue(20);

    useEffect(() => {
        if (isSelectionMode) {
            animateDeleteToolbar();
        } else {
            resetDeleteToolbar();
        }
    }, [isSelectionMode]);

    const animateDeleteToolbar = () => {
        floatingPosition.value = withDelay(300, withTiming(-60, { duration: 300 }));
        deleteToolbarHeight.value = withDelay(600, withTiming(50));
    };

    const resetDeleteToolbar = () => {
        deleteToolbarHeight.value = withTiming(0, { duration: 300 });
        floatingPosition.value = withDelay(300, withTiming(20));
    };

    const reanimatedStyles = useAnimatedStyle(() => {
        return {
            height: deleteToolbarHeight.value
        };
    }, [isSelectionMode]);

    const rea = useAnimatedStyle(() => {
        return {
            right: floatingPosition.value
        };
    });

    return {
        reanimatedStyles,
        rea
    };
};

export function DrawingsList() {
    const { interactionMode, setInteractionMode } = useDrawingListStore();
    const { drawings, onDrawingSelect, isDrawingSelected, isSelectionMode } = useDrawingsList();

    const { rea, reanimatedStyles } = useDeleteToolbarAnimation(
        interactionMode === InteractionMode.SELECTION
    );

    return (
        <>
            {interactionMode === InteractionMode.SELECTION && (
                <Pressable onPress={() => setInteractionMode(InteractionMode.CLOSED)}>
                    <Text>Anuluj</Text>
                </Pressable>
            )}
            <View style={styles.listWrapper}>
                <FlatList
                    data={drawings}
                    renderItem={({ item }) => {
                        return (
                            <DrawingTile
                                key={item.id}
                                id={item.id}
                                svg={item.svg || ""}
                                canvasInfo={item.canvasInfo}
                                onDrawingPress={onDrawingSelect}
                                isDrawingSelected={isDrawingSelected(item.id)}
                                isDeleteMode={isSelectionMode}
                            />
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.listColumnWrapperStyle}
                    contentContainerStyle={styles.listContentContainerStyle}
                    numColumns={DRAWINGS_LIST_COLUMNS}
                />
            </View>
            {/* <DrawingsList /> */}
            <Animated.View style={[{ backgroundColor: "red" }, reanimatedStyles]}>
                <Text>HEHEHEH</Text>
            </Animated.View>
            <Animated.View style={[styles.floatingButtonContainer, rea]}>
                <FloatingActionsButton />
            </Animated.View>
            {interactionMode === InteractionMode.OPEN && (
                <Backdrop
                    onBackdropPress={() => {
                        setInteractionMode(InteractionMode.CLOSED);
                    }}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    floatingButtonContainer: {
        alignItems: "flex-end",
        zIndex: 10,
        position: "absolute",
        bottom: horizontalScale(50),
        right: horizontalScale(30),
        ...getElevation(10)
    },
    listWrapper: {
        flex: 1
    },
    listColumnWrapperStyle: {
        justifyContent: "space-between"
    },
    listContentContainerStyle: {
        rowGap: horizontalScale(Spacings.medium)
    }
});
