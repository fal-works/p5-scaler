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

/** Function that returns the currently required canvas size. */
export let getRequiredCanvasSize: () => ScaledCanvasSize;

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

/** Prepares to calculate canvas size with fixed aspect ratio. */
export const prepareCalcCanvasSizeFixedRatio = (
  logicalSize: RectangleSize
): void => {
  const getRootElementSize = createGetRootElementSize();
  const getScaleFactor = () =>
    calcFittingScaleFactor(logicalSize, getRootElementSize());

  getRequiredCanvasSize = () =>
    createScaledCanvasSize(logicalSize, getScaleFactor());
};

/** Prepares to calculate canvas size with variable aspect ratio. */
export const prepareCalcCanvasSizeVariableRatio = (
  logicalHeight: number
): void => {
  const getRootElementSize = createGetRootElementSize();
  const getScaleFactor = () => getRootElementSize().height / logicalHeight;
  const getLogicalSize = (): RectangleSize => ({
    width: getRootElementSize().width / getScaleFactor(),
    height: logicalHeight,
  });

  getRequiredCanvasSize = () =>
    createScaledCanvasSize(getLogicalSize(), getScaleFactor());
};

/** Prepares to get a fixed canvas size without scaling. */
export const prepareGetFixedCanvasSize = (size: RectangleSize): void => {
  getRequiredCanvasSize = () => ({
    logical: size,
    physical: size,
    scaleFactor: 1.0,
  });
};
