import { Dimensions } from "react-native";
import { PickerColors } from "./colors";
import { horizontalScale, moderateScale, verticalScale } from "../utils/responsiblity";
import { strokes } from "./strokes";

//DRAWING
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const CANVAS_PADDING_HORIZONTAL = horizontalScale(12);
export const CANVAS_WIDTH = WINDOW_WIDTH - 2 * CANVAS_PADDING_HORIZONTAL;
export const DEFAULT_CANVAS_WIDTH = 300;
export const DEFAULT_CANVAS_HEIGHT = 600;

//TOOLBAR
export const TOOLBAR_SIZE = verticalScale(50);
export const TOOLBAR_COLUMNS_DIVIDERS = 4;
export const TOOLBAR_HORIZONTAL_SPACING = horizontalScale(12);
export const TOOLBAR_WIDTH =
    2 * TOOLBAR_SIZE + TOOLBAR_HORIZONTAL_SPACING * TOOLBAR_COLUMNS_DIVIDERS;

//DOT
export const EXTERNAL_DOT_SIZE = verticalScale(30);
export const INTERNAL_DOT_SIZE = verticalScale(25);

//STROKE
export const EXTERNAL_STROKE_SIZE = verticalScale(30);
export const INTERNAL_STROKE_SIZE = verticalScale(30);

//PICKER
export const PICKER_HORIZONTAL_SPACING = verticalScale(10);

//COLOR PICKER
export const COLOR_PICKER_WIDTH =
    (PickerColors.length + 1) * EXTERNAL_DOT_SIZE +
    //PADDING
    2 * PICKER_HORIZONTAL_SPACING +
    //GAPS
    8 * PICKER_HORIZONTAL_SPACING;

//STROKE PICKER
export const STROKE_PICKER_WIDTH =
    (strokes.length + 1) * EXTERNAL_STROKE_SIZE +
    //PADDING
    2 * PICKER_HORIZONTAL_SPACING +
    //GAPS
    8 * PICKER_HORIZONTAL_SPACING;

// FLOATING BUTTON
export const FAB_SIZE = 60;
export const ICON_SIZE = 24;

//CHECKMARK
export const CHECKMARK_ICON_SIZE = moderateScale(25);
export const CHECKMARK_INNER_IMAGE_SIZE = moderateScale(10);
