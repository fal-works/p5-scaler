import p5 from "p5";
import { p } from "./shared";
import { createCanvasSizeWatcher, resizeCanvas } from "./canvas";
import { init } from "./sketch";

/**
 * Enables auto-resize so that the canvas is resized automatically
 * if the required size has been changed.
 */
export const autoResizeCanvas = (
  onCanvasResized?: () => void,
  noRedraw?: boolean
): void => {
  const watch = createCanvasSizeWatcher();

  const apply = (p: p5): void => {
    const drawMain = p.draw || (() => {});
    p.draw = () => {
      const newCanvasSize = watch();
      if (newCanvasSize) resizeCanvas(newCanvasSize, onCanvasResized, noRedraw);

      drawMain();
    };
  };

  if (p) apply(p);
  else init.onCompleteAssignP5.push(apply);
};
