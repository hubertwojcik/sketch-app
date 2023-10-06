import { horizontalScale } from "@/utils";

import React from "react";

import { FlatList, StyleSheet, View } from "react-native";

import { Backdrop } from "@/components";
import { DRAWINGS_LIST_COLUMNS, Spacings } from "@/constants";

import { FloatingActionsButton } from "./components";
import { DrawingTile } from "./components/drawing-tile";
import { useDrawingsList } from "./hooks/";
import { ListHeader } from "./components/list-header";
import { SelectionBottomBar } from "./components/selection-bottom-bar";
import { useDrawingEditorStore, useDrawingListStore } from "@/core";
import { InteractionMode } from "@/types";
import { useRouter } from "expo-router";

export function DrawingsList() {
    const { drawings, interactionMode, setInteractionMode, getDrawingById, removeDrawing } =
        useDrawingListStore();
    const { setLocalDrawing } = useDrawingEditorStore();

    const { chosenDrawingIds, isDrawingSelected, selectedAmount, handleDeleteModeSelection } =
        useDrawingsList();

    const router = useRouter();

    const selectAndNavigateoToDrawing = (drawingId: string) => {
        const drawing = getDrawingById(drawingId);
        if (!drawing) return;
        console.log("qwe");
        setLocalDrawing(drawing);
        router.push({ pathname: `(drawing)/` });
    };

    const handleOnDrawingSelect = (drawingId: string, isDeleteMode: boolean) => {
        if (isDeleteMode) {
            handleDeleteModeSelection(drawingId);
        } else {
            selectAndNavigateoToDrawing(drawingId);
        }
    };

    const onDeleteDrawings = () => {
        chosenDrawingIds.forEach(drawing => removeDrawing(drawing));
        setInteractionMode(InteractionMode.CLOSED);
    };

    return (
        <>
            <ListHeader
                isSelectionMode={interactionMode === InteractionMode.SELECTION}
                cancelSelectionMode={() => setInteractionMode(InteractionMode.CLOSED)}
            />

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
                                onDrawingPress={handleOnDrawingSelect}
                                isDrawingSelected={isDrawingSelected(item.id)}
                                isDeleteMode={interactionMode === InteractionMode.SELECTION}
                            />
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.listColumnWrapperStyle}
                    contentContainerStyle={styles.listContentContainerStyle}
                    numColumns={DRAWINGS_LIST_COLUMNS}
                />
            </View>
            <SelectionBottomBar
                isSelectionMode={interactionMode === InteractionMode.SELECTION}
                selectedAmount={selectedAmount}
                deleteDrawings={onDeleteDrawings}
            />
            <FloatingActionsButton />
            {interactionMode === InteractionMode.OPEN && (
                <Backdrop onBackdropPress={() => setInteractionMode(InteractionMode.CLOSED)} />
            )}
        </>
    );
}

const styles = StyleSheet.create({
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
