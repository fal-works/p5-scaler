import type p5 from "p5";
import type { P2D, WEBGL } from "p5";

/** The width and height. */
export interface RectangleSize {
  readonly width: number;
  readonly height: number;
}

/** Canvas size before and after scaling. */
export interface ScaledCanvasSize {
  /** The canvas size before scaling. */
  readonly logical: RectangleSize;

  /** The canvas size after scaling. */
  readonly physical: RectangleSize;

  /**
   * The ratio of the physical size to the logical size,
   *
   * i.e. `scaleFactor * (logical size) = (physical size)`
   */
  readonly scaleFactor: number;
}

/** Object that provides main features of `p5-scaler`. */
export interface Scaler {
  /** Creates a canvas with the currently required size. */
  readonly createCanvas: (renderer?: P2D | WEBGL) => p5.Renderer;

  /** Resizes the canvas with the currently required size. */
  readonly resizeCanvas: (noRedraw?: boolean) => void;

  /** Calls `drawCallback` scaled with the current scale factor. */
  readonly drawOnCanvas: (drawCallback: (p?: p5) => void) => void;

  /** Returns the last calculated required size. */
  readonly getSize: () => ScaledCanvasSize;

  /** Re-calculates the currently required size. */
  readonly updateRequiredSize: () => ScaledCanvasSize;

  /**
   * Associates this scaler object with a `p5` instance.
   * If not called, assumes global mode.
   */
  readonly setP5Instance: (p: p5) => p5;
}

/** Function returned from `createAutoCanvasResizer()`. */
export type AutoCanvasResizerFunction = (
  onResizeCanvas?: (newSize: ScaledCanvasSize) => void,
  noRedraw?: boolean
) => void;
