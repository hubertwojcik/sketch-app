import { ThemeColors } from "@/constants";
import { ThemeContextValue, ThemeType } from "@/types";
import React, { createContext, useCallback, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<ThemeContextValue>({
    colors: ThemeColors.light,
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
    const colors = useMemo(
        () => (isDarkTheme ? ThemeColors.dark : ThemeColors.light),
        [isDarkTheme]
    );

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
