import p5 from "p5";
import { p } from "../shared";

import { ScaledCanvasSize, calcCanvasSize } from "./scaled-canvas-size";

/**
 * p5.js canvas accompanied by a scale factor.
 */
export interface ScaledCanvas {
  /** The instance returned from `createCanvas()` of p5.js. */
  readonly p5Canvas: p5.Renderer;

  /** Data related to the size of `this` canvas. */
  size: ScaledCanvasSize;
}

/** Calls `p.createCanvas()` with the required size. */
export const constructCanvas = (
  renderer: "p2d" | "webgl" = "p2d"
): ScaledCanvas => {
  const size = calcCanvasSize();
  const { width, height } = size.physical;
  const p5Canvas = p.createCanvas(width, height, renderer);

  return { p5Canvas, size };
};
