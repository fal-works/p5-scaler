import { canvas } from "./shared";
import {
  prepareCalcCanvasSizeFixedRatio,
  prepareCalcCanvasSizeVariableRatio,
  prepareGetFixedCanvasSize,
} from "./canvas";
import { newP5, init } from "./sketch";

interface Starter {
  /**
   * @param p5Methods Set of `p5` methods, e.g. `setup()`/`draw()`.
   *   Note that you should not call `p.createCanvas()` in `setup()` manually
   *   as it will be called automatically.
   * @param renderer Either "p2d" (default) or "webgl".
   */
  start: typeof newP5;
}

/**
 * Entry point of `p5starter`.
 * The canvas size will fit the root element keeping the aspect ratio.
 *
 * Call the returned `start()` function for starting the sketch.
 *
 * @param params.width The logical width of the canvas.
 * @param params.height The logical height of the canvas.
 */
export const fixedRatio = (params: {
  readonly width: number;
  readonly height: number;
}): Starter => {
  prepareCalcCanvasSizeFixedRatio(params);
  return { start: newP5 };
};

/**
 * Entry point of `p5starter` with a variable aspect ratio.
 * The canvas size will fit the root element in both width and height.
 *
 * Call the returned `start()` function for starting the sketch.
 *
 * @param height The logical height of the canvas.
 * @param displayBlock Sets "display: block" to the canvas (default: `true`).
 */
export const variableRatio = (params: {
  readonly height: number;
  readonly displayBlock?: boolean;
}): Starter => {
  prepareCalcCanvasSizeVariableRatio(params.height);
  if (params.displayBlock !== false)
    init.onStartSetup.unshift(() => canvas.p5Canvas.style("display", "block"));

  return { start: newP5 };
};

/**
 * Entry point of `p5starter` with a fixed size without scaling.
 * Call the returned `start()` function for starting the sketch.
 */
export const fixedSize = (params: {
  readonly width: number;
  readonly height: number;
}): Starter => {
  prepareGetFixedCanvasSize(params);
  return { start: newP5 };
};
