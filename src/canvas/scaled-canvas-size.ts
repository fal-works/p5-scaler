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
export const createCalcCanvasSizeFixedRatio = (
  logicalSize: RectangleSize
): (() => ScaledCanvasSize) => {
  const getRootElementSize = createGetRootElementSize();
  const getScaleFactor = () =>
    calcFittingScaleFactor(logicalSize, getRootElementSize());

  return () => createScaledCanvasSize(logicalSize, getScaleFactor());
};

/** @returns Function that calculates canvas size with variable aspect ratio. */
export const createCalcCanvasSizeVariableRatio = (
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

/** @returns Function that returns a fixed canvas size without scaling. */
export const createGetFixedCanvasSize = (
  size: RectangleSize
): (() => ScaledCanvasSize) => {
  return () => ({
    logical: size,
    physical: size,
    scaleFactor: 1.0,
  });
};
