import p5 from "p5";
import { calcFittingScaleFactor, createElementSizeGetter } from "./utility";
import { RectangleSize, ScaledCanvasSize, Scaler } from "./types";

/** Creates a `Scaler` instance with any scaling mode. */
const createScaler = (calcRequiredSize: () => ScaledCanvasSize): Scaler => {
  let size = calcRequiredSize();
  let p: p5 = (window as unknown) as p5;

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
 * @param params.parent Either a DOM element or its ID.
 */
const createScalerFixedRatio = (params: {
  readonly width: number;
  readonly height: number;
  readonly parent?: HTMLElement | string;
}): Scaler => {
  const { width, height, parent } = params;
  const logical: RectangleSize = { width, height };
  const getParentSize = createElementSizeGetter(parent);

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
 * @param params.parent Either a DOM element or its ID.
 */
const createScalerVariableRatio = (params: {
  readonly height: number;
  readonly parent?: HTMLElement | string;
}): Scaler => {
  const { height, parent } = params;
  const getParentSize = createElementSizeGetter(parent);

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
const createScalerFixedSize = (params: {
  readonly width: number;
  readonly height: number;
}): Scaler => {
  const { width, height } = params;
  const logical = { width, height };
  const size = { logical, physical: logical, scaleFactor: 1.0 };
  let p: p5 = (window as unknown) as p5;
  return {
    createCanvas: (renderer = "p2d") => p.createCanvas(width, height, renderer),
    resizeCanvas: () => {},
    drawOnCanvas: (drawCallback) => drawCallback(p),
    getSize: () => size,
    updateRequiredSize: () => size,
    setP5Instance: (p5Instance): p5 => (p = p5Instance),
  };
};

export {
  createScalerFixedRatio as fixedRatio,
  createScalerVariableRatio as variableRatio,
  createScalerFixedSize as fixedSize,
};
