import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuthStore } from "@stores";
import * as Font from "expo-font";
import { SplashScreen, useRouter } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [fontsLoaded] = Font.useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font
    });

    const router = useRouter();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (fontsLoaded) {
            if (isLoggedIn) {
                router.replace("(tabs)/notes");
            } else {
                router.replace("/login");
            }
        }
    }, [fontsLoaded, router, isLoggedIn]);

    const value = {};

    return (
        <AuthContext.Provider value={value}>
            {fontsLoaded ? children : <SplashScreen />}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
