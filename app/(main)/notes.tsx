import { DrawingTile } from "@components";
import { getElevation, horizontalScale, moderateScale } from "@utils";
import { useDrawingListStore } from "@stores";
import spacings from "../../constants/spacings";
import React, { useState } from "react";

import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Backdrop, AddDeleteFloatingButtons } from "@components";
import { DRAWINGS_LIST_COLUMNS } from "@constants";

export default function Notes() {
    const [isFABOpen, setIsFABOpen] = useState(false);

    const { drawings } = useDrawingListStore();

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.listWrapper}>
                    <FlatList
                        data={drawings}
                        renderItem={({ item }) => {
                            return (
                                <DrawingTile
                                    key={item.id}
                                    drawingId={item.id}
                                    svg={item.svg || ""}
                                    canvasInfo={item.canvasInfo}
                                />
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={styles.listColumnWrapperStyle}
                        contentContainerStyle={styles.listContentContainerStyle}
                        numColumns={DRAWINGS_LIST_COLUMNS}
                    />
                </View>
                <View style={styles.floatingButtonContainer}>
                    <AddDeleteFloatingButtons
                        isOpen={isFABOpen}
                        setIsOpen={() => setIsFABOpen(val => !val)}
                    />
                </View>
                {isFABOpen && (
                    <Backdrop
                        onBackdropPress={() => {
                            setIsFABOpen(false);
                        }}
                    />
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(20)
    },
    listWrapper: {
        flex: 1
    },
    listColumnWrapperStyle: {
        justifyContent: "space-between"
    },
    listContentContainerStyle: {
        rowGap: horizontalScale(spacings.medium)
    },
    floatingButtonContainer: {
        alignItems: "flex-end",
        zIndex: 10,
        position: "absolute",
        bottom: horizontalScale(50),
        right: horizontalScale(30),
        ...getElevation(10)
    }
});
