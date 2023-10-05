import { Path } from "@/types";

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
          path.paint && path.path
              ? `<path d="${path.path.toSVGString()}" stroke="${
                    path?.color
                }" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`
              : ""
      )}
      </g>
      </svg>`;
};
