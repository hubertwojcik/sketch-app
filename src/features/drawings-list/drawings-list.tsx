import { horizontalScale } from "@/utils";

import React, { useCallback } from "react";

import { FlatList, StyleSheet, View } from "react-native";

import { Backdrop } from "@/ui";
import { DRAWINGS_LIST_COLUMNS } from "@/constants";

import { useDrawingListStore } from "@/core";
import { InteractionMode } from "@/types";

import { FloatingActionsButton } from "./components";
import { DrawingTile } from "./components/drawing-tile";
import { ListHeader } from "./components/list-header";
import { SelectionBottomBar } from "./components/selection-bottom-bar";
import { useDrawingsList, useDrawingTile } from "./hooks/";
import { Spacings } from "@/ui/theme";

export function DrawingsList() {
    const { drawings, interactionMode, setInteractionMode, removeDrawing } = useDrawingListStore();

    const {
        chosenDrawingIds,
        isDrawingSelected,
        selectedAmount,
        handleDeleteModeSelection,
        clearSelection
    } = useDrawingsList();

    const { handleOnDrawingSelect } = useDrawingTile(handleDeleteModeSelection);

    const onDeleteDrawings = useCallback(() => {
        chosenDrawingIds.forEach(removeDrawing);
        setInteractionMode(InteractionMode.CLOSED);
        clearSelection();
    }, [chosenDrawingIds, removeDrawing, setInteractionMode]);

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
