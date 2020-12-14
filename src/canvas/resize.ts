import { p, canvas } from "../shared";
import { ScaledCanvasSize } from "./scaled-canvas-size";
import { calcCanvasSize } from "./common";

/** @returns `true` if `a` equals `b`. */
const compareScaledCanvasSize = (
  a: ScaledCanvasSize,
  b: ScaledCanvasSize
): boolean => {
  if (a.scaleFactor !== b.scaleFactor) return false;

  const sizeA = a.logical;
  const sizeB = b.logical;

  return sizeA.width === sizeB.width && sizeB.height === sizeB.height;
};

/**
 * Creates a function checks the canvas size.
 * The function returns a new size only if the required size has been changed.
 */
export const createCanvasSizeWatcher = () => {
  let previousSize = calcCanvasSize();

  return () => {
    const newSize = calcCanvasSize();
    if (compareScaledCanvasSize(previousSize, newSize)) return undefined;

    previousSize = newSize;
    return newSize;
  };
};

/** Resizes the canvas. */
export const resizeCanvas = (
  newSize: ScaledCanvasSize,
  onCanvasResized: () => void = () => {},
  noRedraw = false
): void => {
  const { width, height } = newSize.physical;
  p.resizeCanvas(width, height, noRedraw);

  canvas.size = newSize;
  onCanvasResized();
};
