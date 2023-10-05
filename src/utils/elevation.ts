const SHADOW_OFFSET_WIDTH_COEFFICIENT = 0.3;
const SHADOW_OFFSET_HEIGHT_COEFFICIENT = 0.3;
const SHADOW_OPACITY_COEFFICIENT = 0.2;
const SHADOW_RADIUS_COEFFICIENT = 0.7;

export const getElevation = (
    elevation: number,
    widthShadowOffset = SHADOW_OFFSET_WIDTH_COEFFICIENT,
    hegihtShadowOffset = SHADOW_OFFSET_HEIGHT_COEFFICIENT,
    shadowOpacity = SHADOW_OPACITY_COEFFICIENT,
    shadowRadius = SHADOW_RADIUS_COEFFICIENT
) => {
    return {
        elevation,
        shadowColor: "black",
        shadowOffset: {
            width: widthShadowOffset * elevation,
            height: hegihtShadowOffset * elevation
        },
        shadowOpacity: shadowOpacity,
        shadowRadius: shadowRadius * elevation
    };
};
