import "react-native-get-random-values";
import { Drawing, Path } from "types";
import { Colors } from "../utils/colors";
import { strokes } from "../utils/strokes";
import { v4 as uuidv4 } from "uuid";

class DrawingModel implements Drawing {
    id = uuidv4();
    drawingPaths: Path[] = [];
    color = Colors[0];
    strokeWidth = strokes[0];
    svg = "";
    canvasInfo = {
        width: 0,
        height: 0
    };
}

export default DrawingModel;
