import { moderateScale } from "@utils";
import { useRouter } from "expo-router";
import React from "react";

import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Splash() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => router.replace("(main)/notes")}>
                <Text>SPLASH</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: moderateScale(20)
    }
});
