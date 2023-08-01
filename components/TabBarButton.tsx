import { Feather } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring
} from "react-native-reanimated";

type TabButtonProps = {
    iconName: keyof typeof Feather.glyphMap;
    label: string;
} & BottomTabBarButtonProps;

const TabButton = (props: TabButtonProps) => {
    const { onPress, accessibilityState } = props;

    const focused = accessibilityState?.selected;
    const scale = useSharedValue(0);
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (focused) {
            scale.value = withDelay(250, withSpring(1.2));
            translateY.value = withSpring(-15);
            opacity.value = withSpring(1);
        } else {
            scale.value = withSpring(1);
            translateY.value = withSpring(0);
            opacity.value = withSpring(0);
        }
    }, [focused]);

    const rContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }, { translateY: translateY.value }]
        };
    }, []);

    const rTextStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value
        };
    }, []);

    const rButtonStyle = useAnimatedStyle(() => {
        return {
            borderWidth: opacity.value * 4
        };
    }, []);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
                <Animated.View style={[styles.container, rContainerStyle]}>
                    <Animated.View style={[styles.btn, rButtonStyle]}>
                        <View style={styles.circle} />
                        <Feather name={props.iconName} size={24} color="black" />
                    </Animated.View>
                    {focused && (
                        <Animated.Text style={[styles.text, rTextStyle]}>
                            {props.label}
                        </Animated.Text>
                    )}
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

export default TabButton;

const styles = StyleSheet.create({
    wrapper: { flex: 1, height: 60 },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        width: 45,
        height: 45,
        borderRadius: 25,

        borderColor: "grey",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25
    },
    text: {
        fontSize: 12,
        textAlign: "center",
        color: "black",
        marginTop: 3,
        fontWeight: "500"
    }
});
