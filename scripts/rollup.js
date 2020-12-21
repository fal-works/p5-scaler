const rollupApi = require("rollup");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const cleanup = require("rollup-plugin-cleanup");

const { cmdEx } = require("@fal-works/s-l-t-r");

const {
  banner,
  external,
  rollupInput,
  rollupIifeGlobals,
} = require("../config");

const { LibType, getPaths, getGlobalName } = require("./lib-type");

const createPlugins = () => [
  nodeResolve(),
  cleanup({
    comments: /^\*\*/, // preserve jsdoc comments
    sourcemap: false,
    extensions: ["js"],
  }),
];

const rollupFormatTable = new Map();
rollupFormatTable.set(LibType.Iife, "iife");
rollupFormatTable.set(LibType.Esm, "es");

const getRollupFormat = (libType) => {
  const format = rollupFormatTable.get(libType);
  if (!format) throw `Unknown lib type: ${libType}`;
  return format;
};

async function run(libType) {
  const rollupFormat = getRollupFormat(libType);

  const generator = await rollupApi.rollup({
    input: rollupInput,
    external,
    plugins: createPlugins(),
  });

  const { libPath } = getPaths(libType);

  await generator.write({
    file: libPath,
    format: rollupFormat,
    name: getGlobalName(libType),
    sourcemap: false,
    banner,
    globals: libType === LibType.Iife ? rollupIifeGlobals : undefined,
  });

  generator.close();
}

const rollup = (libType) => cmdEx(() => run(libType), `rollup ${libType}`);

module.exports = {
  rollup,
};
