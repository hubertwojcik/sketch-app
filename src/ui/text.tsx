import { Text as RNText } from "react-native";
import type { TextProps as RNTextProps, TextStyle } from "react-native";
import React from "react";
import { colors } from "./theme";
import { moderateScale } from "@/utils";

type TextVariant = "heading1" | "heading2" | "heading3" | "lg" | "md" | "sm";

export const TEXT_VARIANTS: Record<TextVariant, TextStyle> = {
    heading1: { fontSize: moderateScale(32), lineHeight: moderateScale(48), fontWeight: "800" },
    heading2: { fontSize: moderateScale(28), lineHeight: moderateScale(42) },
    heading3: { fontSize: moderateScale(24), lineHeight: moderateScale(36) },
    lg: { fontSize: moderateScale(18), lineHeight: moderateScale(30) },
    md: { fontSize: moderateScale(16), lineHeight: moderateScale(24) },
    sm: { fontSize: moderateScale(14), lineHeight: moderateScale(21) }
};

type TextProps = RNTextProps & {
    variant?: TextVariant;
};

export const Text = ({ variant = "md", style, ...props }: TextProps) => {
    const defaultStyles: TextStyle = {
        color: colors.black,
        fontFamily: "SpaceMono"
    };

    return <RNText style={[defaultStyles, TEXT_VARIANTS[variant], style]} {...props} />;
};
