import p5 from "p5";
import { RectangleSize } from "../types";

/** Receives DOM element or its ID and returns the found element. */
const tryFindElement = (
  elm: HTMLElement | string | undefined
): HTMLElement | undefined | null =>
  typeof elm === "string" ? document.getElementById(elm) : elm;

/**
 * Appends the DOM element of `canvas` under `parent`. Useful in global mode.
 * @param canvas The instance returned from `createCanvas()`.
 * @param parent Either a DOM element or its ID.
 */
const setP5CanvasParentElement = (
  canvas: p5.Renderer,
  parentElementOrId: HTMLElement | string
): void => {
  const parentElement = tryFindElement(parentElementOrId);
  if (parentElement) parentElement.appendChild(canvas.elt);
};

/** Creates a function that returns the size of `element`. */
const createElementSizeGetter = (
  elementOrId?: HTMLElement | string
): (() => RectangleSize) => {
  const element = tryFindElement(elementOrId);
  return !element || element === document.body
    ? () => ({ width: window.innerWidth, height: window.innerHeight })
    : () => element.getBoundingClientRect();
};

export {
  setP5CanvasParentElement as setParentElement,
  createElementSizeGetter,
};
