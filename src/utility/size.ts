import type { RectangleSize } from "../types";

/**
 * Calculates the scale factor for fitting `nonScaledSize` to `targetSize`
 * keeping the original aspect ratio.
 */
const calcFittingScaleFactor = (
  nonScaledSize: RectangleSize,
  targetSize: RectangleSize
): number =>
  Math.min(
    targetSize.width / nonScaledSize.width,
    targetSize.height / nonScaledSize.height
  );

export { calcFittingScaleFactor };
