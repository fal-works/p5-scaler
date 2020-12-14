import p5 from "p5";

type P5Handler = (p: p5) => void;

/** Called when starting to assign methods to `p5` instance. */
export const onStartAssignP5: P5Handler[] = [];

/** Called when completing to assign methods to `p5` instance. */
export const onCompleteAssignP5: P5Handler[] = [];

/** Called when starting `p.setup()` (just after creating a canvas). */
export const onStartSetup: P5Handler[] = [];

/** Called when completing `p.setup()`. */
export const onCompleteSetup: P5Handler[] = [];

/** Runs all registered callbacks and then clears the array. */
export const consumeInitializationCallbacks = (
  array: P5Handler[],
  p: p5
): void => {
  for (const callback of array) callback(p);
  array.length = 0;
};
