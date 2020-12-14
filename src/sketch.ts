import p5, { P2D, WEBGL } from "p5";
import { P5Methods } from "./p5methods";

import { setP5Instance, canvas, setCanvas, rootElement } from "./shared";
import {
  onStartAssignP5,
  onCompleteAssignP5,
  onStartSetup,
  onCompleteSetup,
  consumeInitializationCallbacks,
} from "./initialization-callbacks";

import {
  setCalcCanvasSize,
  createCalcCanvasSizeFixed,
  createCalcCanvasSizeVariable,
  constructCanvas,
} from "./canvas";

export type RendererType = P2D | WEBGL;

/** Creates a new `p5` instance. */
const newP5 = (p5Methods: P5Methods, renderer?: RendererType): void => {
  new p5((p: p5): void => {
    setP5Instance(p);
    consumeInitializationCallbacks(onStartAssignP5, p);

    Object.assign(p, p5Methods);

    const setupMain = p.setup || (() => {});
    p.setup = () => {
      setCanvas(constructCanvas(renderer));
      consumeInitializationCallbacks(onStartSetup, p);
      setupMain();
      consumeInitializationCallbacks(onCompleteSetup, p);
    };

    consumeInitializationCallbacks(onCompleteAssignP5, p);
  }, rootElement);
};

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
 * The canvas size will fit the root element keeping the aspect ratio
 * (unless the flag `disableCanvasScaling` is set).
 *
 * Call the returned `start()` function for starting the sketch.
 *
 * @param params.width The logical width of the canvas.
 * @param params.height The logical height of the canvas.
 */
export const fixedRatio = (params: {
  width: number;
  height: number;
  disableCanvasScaling?: boolean;
}): Starter => {
  setCalcCanvasSize(
    createCalcCanvasSizeFixed(params, params.disableCanvasScaling)
  );

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
  height: number;
  displayBlock?: boolean;
}): Starter => {
  setCalcCanvasSize(createCalcCanvasSizeVariable(params.height));
  if (params.displayBlock !== false)
    onStartSetup.unshift(() => canvas.p5Canvas.style("display", "block"));

  return { start: newP5 };
};
