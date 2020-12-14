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
