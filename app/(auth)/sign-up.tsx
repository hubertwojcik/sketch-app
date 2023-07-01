import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function SignIn() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Link href="sign-in" asChild>
                <Pressable>
                    <Text>Sign in</Text>
                </Pressable>
            </Link>
        </View>
    );
}
