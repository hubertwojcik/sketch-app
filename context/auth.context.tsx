import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Font from "expo-font";
import { SplashScreen, useRouter } from "expo-router";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAuthStore } from "../stores";

export const AuthContext = createContext({} as any);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [fontsLoaded, error] = Font.useFonts({
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

    const value = {} as any;

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
