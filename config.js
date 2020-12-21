const version = "0.2.0";
const year = "2020";

const moduleName = "p5-scaler";

const banner = `/**
 * ${moduleName}
 * --------------------------------------------------------------------------
 * A small library for scaling p5.js sketches.
 * https://fal-works.github.io/${moduleName}/
 * @copyright ${year} FAL
 * @license MIT
 * @version ${version}
 */
`;

const iifeName = "p5s";

const dir = {
  lib: "lib",
  docs: "docs",
  types: "types",
  rollupInput: "out",
};
const external = ["p5"];

const esbuildInput = "src/index.ts";
const rollupInput = "out/index.js";
const rollupIifeGlobals = { p5: "p5" };

// ------------------------------------------------------------------------

module.exports = {
  moduleName,
  banner,
  iifeName,
  dir,
  external,
  esbuildInput,
  rollupInput,
  rollupIifeGlobals,
};
