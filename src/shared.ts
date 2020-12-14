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
export let rootElement: HTMLElement = document.body;

/** Sets `element` as the root so that it will contain the canvas. */
export const setRootElement = (element: HTMLElement): void => {
  rootElement = element;
};

/** Sets the element of `id` as the root so that it will contain the canvas. */
export const setRootElementID = (id: string): void => {
  const element = document.getElementById(id);
  if (element) rootElement = element;
};
