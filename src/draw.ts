import { p, canvas } from "./shared";

/** Runs `drawCallback` scaled with the current canvas scale factor. */
export const drawOnCanvas = (drawCallback: () => any): void => {
  const { scaleFactor } = canvas.size;
  p.scale(scaleFactor);
  drawCallback();
  p.scale(1.0 / scaleFactor);
};
