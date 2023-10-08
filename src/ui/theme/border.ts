import { moderateScale } from "@/utils";

export type BorderSize = "thin" | "average" | "thick";

export const borderSizes: Record<BorderSize, number> = {
    thin: moderateScale(1),
    average: moderateScale(2),
    thick: moderateScale(3)
};

export const borderRadiusSizes: Record<BorderSize, number> = {
    thin: moderateScale(4),
    average: moderateScale(8),
    thick: moderateScale(16)
};
