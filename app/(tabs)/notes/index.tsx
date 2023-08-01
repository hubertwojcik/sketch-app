import { DrawingTile } from "@components";
import { useDrawingStore } from "@stores";
import { useRouter } from "expo-router";
import React from "react";

import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notes() {
    const router = useRouter();
    const { drawings } = useDrawingStore();
    console.log("🚀 ~ file: index.tsx:13 ~ Notes ~ drawings:", drawings);
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>HEADER</Text>
            <Pressable
                onPress={() => {
                    router.push({
                        pathname: "(note)/create"
                    });
                }}
            >
                <Text>Add note</Text>
            </Pressable>

            <FlatList
                data={drawings}
                renderItem={({ item }) => (
                    <DrawingTile
                        key={item.id}
                        drawingId={item.id}
                        svg={item.svg || ""}
                        canvasInfo={item.canvasInfo}
                        width={width}
                    />
                )}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ rowGap: 15 }}
                numColumns={2}
            />
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
