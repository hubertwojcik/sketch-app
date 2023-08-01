import { createContext, useCallback, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import React from "react";
import { ThemeContextValue, ThemeType } from "@types";
import { Colors } from "@constants";

export const ThemeContext = createContext<ThemeContextValue>({
    colors: Colors.light,
    themeType: "light",
    isDarkTheme: false,
    setThemeType: undefined,
    toggleThemeType: undefined
});

export type ThemeContextProviderProps = {
    children: React.ReactNode;
};

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
    const colorScheme = useColorScheme();
    const [themeType, setThemeType] = useState<ThemeType>(colorScheme || "light");

    const toggleThemeType = useCallback(() => {
        setThemeType(prev => (prev === "dark" ? "light" : "dark"));
    }, []);

    const isDarkTheme = useMemo(() => themeType === "dark", [themeType]);
    const colors = useMemo(() => (isDarkTheme ? Colors.dark : Colors.light), [isDarkTheme]);

    return (
        <ThemeContext.Provider
            value={{
                colors,
                themeType,
                isDarkTheme,
                setThemeType,
                toggleThemeType
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
