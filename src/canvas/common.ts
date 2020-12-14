import { ScaledCanvasSize } from "./scaled-canvas-size";

/** Calculation function that should be set before creating a sketch. */
export let calcCanvasSize: () => ScaledCanvasSize;

export const setCalcCanvasSize = (func: () => ScaledCanvasSize): void => {
  calcCanvasSize = func;
};
