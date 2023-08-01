import { horizontalScale } from "@constants";
import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const CANVAS_PADDING_HORIZONTAL = horizontalScale(12);
export const CANVAS_WIDTH = SCREEN_WIDTH - 2 * CANVAS_PADDING_HORIZONTAL;
