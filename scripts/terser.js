if (!require.resolve("terser")) throw "terser not installed.";
const terserApi = require("terser");

const fs = require("fs");
const { cmdEx } = require("@fal-works/s-l-t-r");
const { getPaths, LibType } = require("./lib-type");

const run = async (libType) => {
  const { libPath, libPathMin } = getPaths(libType);

  const inputCode = await fs.promises.readFile(libPath);

  const output = await terserApi.minify(inputCode.toString(), {
    ecma: 2015,
    module: libType === LibType.Esm,
  });
  return await fs.promises.writeFile(libPathMin, output.code);
};

const terser = (libType) => cmdEx(() => run(libType), `terser ${libType}`);

module.exports = {
  terser,
};
