import p5 from "p5";
import { calcFittingScaleFactor, createGetParentSize } from "./utility";
import { RectangleSize, ScaledCanvasSize, Scaler } from "./types";

/** Creates a `Scaler` instance with any scaling mode. */
const createScaler = (calcRequiredSize: () => ScaledCanvasSize): Scaler => {
  let size = calcRequiredSize();
  let p: p5 = window as any;

  return {
    createCanvas: (renderer = "p2d") =>
      p.createCanvas(size.physical.width, size.physical.height, renderer),
    resizeCanvas: (noRedraw = false) =>
      p.resizeCanvas(size.physical.width, size.physical.height, noRedraw),
    drawOnCanvas: (drawCallback) => {
      const { scaleFactor } = size;
      p.scale(scaleFactor);
      drawCallback(p);
      p.scale(1.0 / scaleFactor);
    },
    getSize: () => size,
    updateRequiredSize: () => (size = calcRequiredSize()),
    setP5Instance: (p5Instance): p5 => (p = p5Instance),
  };
};

/**
 * Creates a `Scaler` instance.
 * The canvas size will fit the parent element keeping the aspect ratio.
 */
export const fixedRatio = (params: {
  readonly width: number;
  readonly height: number;
  readonly parentElementOrId?: HTMLElement | string;
}): Scaler => {
  const { width, height, parentElementOrId } = params;
  const logical: RectangleSize = { width, height };
  const getParentSize = createGetParentSize(parentElementOrId);

  const calcSize = () => {
    const scaleFactor = calcFittingScaleFactor(logical, getParentSize());
    const physical = {
      width: scaleFactor * width,
      height: scaleFactor * height,
    };
    return { logical, physical, scaleFactor };
  };

  return createScaler(calcSize);
};

/**
 * Creates a `Scaler` instance with a variable aspect ratio.
 * The canvas size will fit the parent element in both width and height.
 */
export const variableRatio = (params: {
  readonly height: number;
  readonly parentElementOrId?: HTMLElement | string;
}): Scaler => {
  const { height, parentElementOrId } = params;
  const getParentSize = createGetParentSize(parentElementOrId);

  const calcSize = () => {
    const physical = getParentSize();
    const scaleFactor = physical.height / height;
    const logical = {
      width: physical.width / scaleFactor,
      height,
    };
    return { logical, physical, scaleFactor };
  };

  return createScaler(calcSize);
};

/**
 * Creates a `Scaler` instance with a fixed size without scaling.
 * This is just for compatibility with other scaling modes of `p5-scaler`.
 */
export const fixedSize = (params: {
  readonly width: number;
  readonly height: number;
}): Scaler => {
  const { width, height } = params;
  const logical = { width, height };
  const size = { logical, physical: logical, scaleFactor: 1.0 };
  let p: p5 = window as any;
  return {
    createCanvas: (renderer = "p2d") => p.createCanvas(width, height, renderer),
    resizeCanvas: () => {},
    drawOnCanvas: (drawCallback) => drawCallback(p),
    getSize: () => size,
    updateRequiredSize: () => size,
    setP5Instance: (p5Instance): p5 => (p = p5Instance),
  };
};
