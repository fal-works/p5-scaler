import {
  RectangleSize,
  createGetRootElementSize,
  calcFittingScaleFactor,
} from "./size-utility";

/** Canvas size before and after scaling. */
export interface ScaledCanvasSize {
  /** The canvas size before scaling. */
  readonly logical: RectangleSize;

  /** The canvas size after scaling. */
  readonly physical: RectangleSize;

  /**
   * The ratio of the physical size to the logical size,
   * i.e. `scaleFactor * (logical size) = (physical size)`
   */
  readonly scaleFactor: number;
}

/** Creates a `ScaledCanvasSize` instance. */
const createScaledCanvasSize = (
  logicalSize: RectangleSize,
  scaleFactor: number
): ScaledCanvasSize => ({
  scaleFactor,
  logical: logicalSize,
  physical: {
    width: scaleFactor * logicalSize.width,
    height: scaleFactor * logicalSize.height,
  },
});

/** @returns Function that calculates canvas size with fixed aspect ratio. */
export const createCalcCanvasSizeFixed = (
  logicalSize: RectangleSize,
  disableCanvasScaling?: boolean
): (() => ScaledCanvasSize) => {
  const getRootElementSize = createGetRootElementSize();
  const getScaleFactor =
    disableCanvasScaling === true
      ? () => 1.0
      : () => calcFittingScaleFactor(logicalSize, getRootElementSize());

  return () => createScaledCanvasSize(logicalSize, getScaleFactor());
};

/** @returns Function that calculates canvas size with variable aspect ratio. */
export const createCalcCanvasSizeVariable = (
  logicalHeight: number
): (() => ScaledCanvasSize) => {
  const getRootElementSize = createGetRootElementSize();
  const getScaleFactor = () => getRootElementSize().height / logicalHeight;
  const getLogicalSize = (): RectangleSize => ({
    width: getRootElementSize().width / getScaleFactor(),
    height: logicalHeight,
  });

  return () => createScaledCanvasSize(getLogicalSize(), getScaleFactor());
};
