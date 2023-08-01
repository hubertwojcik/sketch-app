import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const guidlineBaseWidth = 390;
const guidlineBaseHeight = 844;

export const horizontalScale = (size: number) => (width / guidlineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidlineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
    size + (horizontalScale(size) - size) * factor;
