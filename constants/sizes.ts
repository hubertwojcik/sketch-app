import { Dimensions } from "react-native";
import { horizontalScale } from "./responsiblity";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const CANVAS_PADDING_HORIZONTAL = horizontalScale(12);
export const CANVAS_WIDTH = SCREEN_WIDTH - 2 * CANVAS_PADDING_HORIZONTAL;
export const DEFAULT_CANVAS_WIDTH = 300;
export const DEFAULT_CANVAS_HEIGHT = 600;
