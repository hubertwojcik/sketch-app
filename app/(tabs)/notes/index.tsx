import { DrawingTile } from "@components";
import { useDrawingStore } from "@stores";
import { useRouter } from "expo-router";
import React from "react";

import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notes() {
    const router = useRouter();
    const { drawings, createLocalDrawing } = useDrawingStore();

    const { width } = useWindowDimensions();

    const createNewDrawing = () => {
        createLocalDrawing();
        router.push({
            pathname: "(note)/"
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>HEADER</Text>
            <Pressable onPress={createNewDrawing}>
                <Text>Add note</Text>
            </Pressable>
            <View style={{ backgroundColor: "red", flex: 1 }}>
                <FlatList
                    data={drawings}
                    renderItem={({ item }) => {
                        return (
                            <DrawingTile
                                key={item.id}
                                drawingId={item.id}
                                svg={item.svg || ""}
                                canvasInfo={item.canvasInfo}
                                width={width}
                            />
                        );
                    }}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        backgroundColor: "red"
                    }}
                    contentContainerStyle={{ rowGap: 15 }}
                    numColumns={2}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0"
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "bold"
    }
});
