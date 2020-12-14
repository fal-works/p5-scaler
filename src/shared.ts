import p5 from "p5";
import { ScaledCanvas } from "./canvas";

/** The shared `p5` instance. */
export let p: p5;

export const setP5Instance = (instance: p5): void => {
  p = instance;
};

/** The shared `ScaledCanvas` instance. */
export let canvas: ScaledCanvas;

export const setCanvas = (instance: ScaledCanvas): void => {
  canvas = instance;
};

/** The HTMLElement that contains the canvas. */
export let rootElement: HTMLElement;

/** Returns `document.body` if the given element is not found. */
const validateHTMLElement = (
  elementOrId: HTMLElement | string | undefined | null
): HTMLElement => {
  if (!elementOrId) return document.body;
  if (typeof elementOrId === "string")
    return document.getElementById(elementOrId) || document.body;
  return elementOrId;
};

export const setRootElement = (elementOrID?: HTMLElement | string): void => {
  rootElement = validateHTMLElement(elementOrID);
};
