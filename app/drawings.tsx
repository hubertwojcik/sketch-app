import { moderateScale } from "@/utils";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DrawingsList } from "@/features";

export default function DrawingsListScreen() {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <DrawingsList />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(20)
    }
});
