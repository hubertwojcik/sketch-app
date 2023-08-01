//STROKE LINECAP

import { Path } from "@types";

//  stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"
export const makeSvgFromPaths = (
    paths: Path[],
    options: {
        width: number;
        height: number;
        backgroundColor?: string;
    }
) => {
    return `<svg width="${options.width}" height="${options.height}" viewBox="0 0 ${
        options.width
    } ${options.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${options.width}" height="${options.height}" fill="${
        options.backgroundColor || "white"
    }"/>
    <g>
  
      ${paths.map(path =>
          path.path
              ? `<path d="${path.path.toSVGString()}" stroke="${path.color}" stroke-width="${
                    path.strokeWidth
                }"
     
            />`
              : ""
      )}
      </g>
      </svg>`;
};
