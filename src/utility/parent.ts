import p5 from "p5";
import { RectangleSize } from "../types";

const tryFindElement = (
  elm: HTMLElement | string | undefined
): HTMLElement | undefined | null =>
  typeof elm === "string" ? document.getElementById(elm) : elm;

/**
 * Appends the DOM element of `canvas` under `parent`. Useful in global mode.
 * @param canvas The instance returned from `createCanvas()`.
 * @param parent Either a DOM element or its ID.
 */
export const setParentElement = (
  canvas: p5.Renderer,
  parentElementOrId: HTMLElement | string
): void => {
  const parentElement = tryFindElement(parentElementOrId);
  if (parentElement) parentElement.appendChild(canvas.elt);
};

/** Creates a function that returns the size of the parent area. */
export const createGetParentSize = (
  parentElementOrId?: HTMLElement | string
): (() => RectangleSize) => {
  const element = tryFindElement(parentElementOrId);
  return !element || element === document.body
    ? () => ({ width: window.innerWidth, height: window.innerHeight })
    : () => element.getBoundingClientRect();
};
