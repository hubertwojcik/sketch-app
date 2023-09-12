import { DrawingTile } from "@components";
import { horizontalScale, moderateScale } from "@utils";
import { useDrawingEditorStore, useDrawingListStore } from "@stores";
import spacings from "../../constants/spacings";
import { useRouter } from "expo-router";
import React from "react";

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionButton } from "../../components/FloatingButtons";

const DRAWING_LIST_COLUMNS = 2;

export default function Notes() {
    const router = useRouter();

    const { drawings } = useDrawingListStore();

    const { createLocalDrawing } = useDrawingEditorStore();

    const createNewDrawing = () => {
        createLocalDrawing();
        router.push({
            pathname: "(note)/"
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text>HEADER</Text>
            <Pressable onPress={createNewDrawing}>
                <Text>Add note</Text>
            </Pressable>
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
                    columnWrapperStyle={styles.listColumnWrapperStyle}
                    contentContainerStyle={styles.listContentContainerStyle}
                    numColumns={DRAWING_LIST_COLUMNS}
                />
            </View>
            <View>
                <ActionButton />
            </View>
        </SafeAreaView>
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
    }
});
