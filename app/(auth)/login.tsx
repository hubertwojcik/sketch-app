import { useAuthStore } from "../../stores";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function SignIn() {
    const { login, logout } = useAuthStore(state => state);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text
                onPress={() => {
                    login();
                }}
            >
                Sign In
            </Text>
            <Link href="sign-up" asChild>
                <Pressable>
                    <Text>Sign UP</Text>
                </Pressable>
            </Link>
            <Pressable onPress={logout}>
                <Text>LOGOUT</Text>
            </Pressable>
        </View>
    );
}
