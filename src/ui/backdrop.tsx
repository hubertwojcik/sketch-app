import React from "react";
import { Pressable, StyleSheet } from "react-native";

type BackdropProps = {
    onBackdropPress: () => void;
    backgroundColor?: string;
};

export const Backdrop = ({ onBackdropPress, backgroundColor }: BackdropProps) => {
    return <Pressable onPress={onBackdropPress} style={[styles.container, { backgroundColor }]} />;
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "transparent"
    }
});
