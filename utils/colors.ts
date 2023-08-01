export const Colors = ["black", "red", "blue", "green", "yellow", "white"] as const;

export const getElevation = (elevation: number) => {
    return {
        elevation,
        shadowColor: "black",
        shadowOffset: { width: 0.3 * elevation, height: 0.5 * elevation },
        shadowOpacity: 0.2,
        shadowRadius: 0.7 * elevation
    };
};
