import p5 from "p5";
import { ScaledCanvas } from "./canvas";

/** `p5` instance shared within the entire sketch. */
export let p: p5;

export const setP5Instance = (instance: p5): void => {
  p = instance;
};

/** `ScaledCanvas` instance shared within the entire sketch. */
export let canvas: ScaledCanvas;

export const setCanvas = (instance: ScaledCanvas): void => {
  canvas = instance;
};

/** The HTML element that contains the canvas (default: `document.body`). */
export let rootElement: HTMLElement = document.body;

/** Sets `element` as the root so that it contains the canvas. */
export const setRootElement = (element: HTMLElement): void => {
  rootElement = element;
};

/** Sets the element of `id` as the root so that it contains the canvas. */
export const setRootElementID = (id: string): void => {
  const element = document.getElementById(id);
  if (element) rootElement = element;
};
