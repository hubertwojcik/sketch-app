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

export function DrawingsList() {
    const {
        drawings,
        onDrawingSelect,
        isDrawingSelected,
        isSelectionMode,
        isOpenMode,
        cancelSelectionMode,
        selectedAmount
    } = useDrawingsList();

    return (
        <>
            <ListHeader
                isSelectionMode={isSelectionMode}
                cancelSelectionMode={cancelSelectionMode}
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
            <SelectionBottomBar isSelectionMode={isSelectionMode} selectedAmount={selectedAmount} />
            <FloatingActionsButton />
            {isOpenMode && (
                <Backdrop
                    onBackdropPress={() => {
                        cancelSelectionMode();
                    }}
                />
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
