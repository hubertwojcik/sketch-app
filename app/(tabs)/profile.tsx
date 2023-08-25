import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

import { useAuthStore } from "../../stores";

export default function Profile() {
    const { logout } = useAuthStore(state => state);

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Pressable onPress={logout}>
                <Text>LOGOUT</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
