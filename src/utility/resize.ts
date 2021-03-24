import { AutoCanvasResizerFunction, ScaledCanvasSize, Scaler } from "../types";

/** @returns `true` if `a` equals `b`. */
const equalScaledCanvasSize = (
  a: ScaledCanvasSize,
  b: ScaledCanvasSize
): boolean => {
  if (a.scaleFactor !== b.scaleFactor) return false;

  const sizeA = a.logical;
  const sizeB = b.logical;

  return sizeA.width === sizeB.width && sizeB.height === sizeB.height;
};

/**
 * Creates a function that checks the change in required canvas size
 * and resizes the actual canvas if needed.
 */
const createAutoCanvasResizer = (scaler: Scaler): AutoCanvasResizerFunction => {
  let lastSize = scaler.getSize();
  const { updateRequiredSize } = scaler;

  return (
    onResizeCanvas?: (newSize: ScaledCanvasSize) => void,
    noRedraw = false
  ) => {
    const newSize = updateRequiredSize();
    if (equalScaledCanvasSize(lastSize, newSize)) return;

    scaler.resizeCanvas(noRedraw);
    if (onResizeCanvas) onResizeCanvas(newSize);
    lastSize = newSize;
  };
};

export { createAutoCanvasResizer };
