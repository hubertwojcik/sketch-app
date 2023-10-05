import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { useWindowDimensions } from "react-native";
import { useSelectionModeAnimations } from "../animations";

type CancelSelectionMode = {
    isSelectionMode: boolean;
    cancelSelectionMode: () => void;
};

export const ListHeader = ({ cancelSelectionMode, isSelectionMode }: CancelSelectionMode) => {
    const { reanimatedCancelButtonStyles, reanimatedHeaderStyles } =
        useSelectionModeAnimations(isSelectionMode);
    const { width } = useWindowDimensions();

    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20
                }
            ]}
        >
            <Animated.View
                style={[
                    {
                        flex: 1
                    },
                    reanimatedHeaderStyles
                ]}
            >
                <Text style={{ fontSize: 32, fontWeight: "800", letterSpacing: 2 }}>Sketcher</Text>
            </Animated.View>
            <Animated.View
                style={[
                    {
                        alignItems: "flex-end",

                        transform: [
                            {
                                translateX: width
                            }
                        ]
                    },
                    reanimatedCancelButtonStyles
                ]}
            >
                <Pressable
                    onPress={() => cancelSelectionMode()}
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        paddingHorizontal: 16,
                        paddingVertical: 5,
                        borderRadius: 20
                    }}
                >
                    <Text style={{ color: "white" }}>Anuluj</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
};
