import { rootElement } from "../shared";

/** The width and height. */
export interface RectangleSize {
  readonly width: number;
  readonly height: number;
}

/** @returns The inner width and height of `window`. */
const getWindowSize = (): RectangleSize => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

/**
 * Creates a function that returns the size of the root element.
 * If the root is `document.body`, the function returns the window size.
 */
export const createGetRootElementSize = (): (() => RectangleSize) => {
  return rootElement === document.body
    ? getWindowSize
    : () => rootElement.getBoundingClientRect();
};

/**
 * Calculates the scale factor for fitting `nonScaledSize` to `targetSize`
 * keeping the original aspect ratio.
 */
export const calcFittingScaleFactor = (
  nonScaledSize: RectangleSize,
  targetSize: RectangleSize
): number => {
  return Math.min(
    targetSize.width / nonScaledSize.width,
    targetSize.height / nonScaledSize.height
  );
};
