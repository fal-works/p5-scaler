import resolve from "@rollup/plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";

// ----------------------------------------------------------------------------

const version = "0.2.0";

const moduleName = "p5-scaler";
const umdName = "p5s";
const year = "2020";

const bannerComment = `/**
 * ${moduleName}
 * --------------------------------------------------------------------------
 * Small library for scaling p5.js sketches.
 * https://fal-works.github.io/${moduleName}/
 * @module ${moduleName}
 * @copyright ${year} FAL
 * @author FAL <contact@fal-works.com>
 * @license MIT
 * @version ${version}
 */
`;

const distributionDirectory = "lib";

// ----------------------------------------------------------------------------

export { distributionDirectory, moduleName, umdName, bannerComment };

export const input = `out/index.js`;
export const external = ["p5"];

export const createPlugins = () => [
  resolve(),
  cleanup({
    comments: /^\*\*/, // preserve jsdoc comments
    sourcemap: false,
    extensions: ["js"],
  }),
];
