import resolve from "@rollup/plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";

// ----------------------------------------------------------------------------

const version = "0.1.0";

const moduleName = "p5starter";
const umdName = "p5starter";
const year = "2020";

const bannerComment = `/**
 * ${moduleName}
 * ──────────────────────────────────────────────────────────────────────────
 * Utility library for creating p5.js sketches.
 * https://fal-works.github.io/${moduleName}/
 *
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

export const input = `out/${moduleName}.js`;
export const external = ["p5"];

export const createPlugins = () => [
  resolve(),
  cleanup({
    comments: /^\*\*/, // preserve jsdoc comments
    sourcemap: false,
    extensions: ["js"],
  }),
];
