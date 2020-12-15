import p5, { P2D, WEBGL } from "p5";
import { P5Methods } from "./p5-methods";
import { setP5Instance, setCanvas, rootElement } from "./shared";
import { ScaledCanvas, constructCanvas } from "./canvas";

interface Initializer {
  /** Called just after assigning methods to `p5` instance. */
  onCompleteAssignP5: ((p: p5) => any)[];
  /** Called when starting setup, just after creating a canvas. */
  onStartSetup: ((p: p5, canvas: ScaledCanvas) => any)[];
}

/** Set of functions automatically called in the initialization process. */
export let init: Initializer = {
  onCompleteAssignP5: [],
  onStartSetup: [],
};

export type RendererType = P2D | WEBGL;

/** Creates a new `p5` instance. */
export const newP5 = (p5Methods: P5Methods, renderer?: RendererType): void => {
  new p5((p: p5): void => {
    setP5Instance(p);
    Object.assign(p, p5Methods);

    const setupMain = p.setup || (() => {});
    p.setup = () => {
      const canvas = setCanvas(constructCanvas(renderer));
      for (const callback of init.onStartSetup) callback(p, canvas);
      init = undefined as any;
      setupMain();
    };

    for (const callback of init.onCompleteAssignP5) callback(p);
  }, rootElement);
};
