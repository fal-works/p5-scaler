import p5 from "p5";
import { ScaledCanvas } from "./canvas";

/** `p5` instance shared within the entire sketch. */
export let p: p5;

export const setP5Instance = (instance: p5): p5 => (p = instance);

/** `ScaledCanvas` instance shared within the entire sketch. */
export let canvas: ScaledCanvas;

export const setCanvas = (instance: ScaledCanvas): ScaledCanvas =>
  (canvas = instance);

/** The HTML element that contains the canvas (default: `document.body`). */
export let rootElement: HTMLElement = document.body;

/** Sets `element` as the root (= canvas container). */
export const setRootElement = (element: HTMLElement): HTMLElement =>
  (rootElement = element);

/** Sets the element of `id` as the root (= canvas container). */
export const setRootElementID = (id: string): HTMLElement =>
  (rootElement = document.getElementById(id) || document.body);
