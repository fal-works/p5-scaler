const esbuildApi = require("esbuild");

const { getPaths } = require("./lib-type");
const { cmdEx } = require("@fal-works/s-l-t-r");

const run = (libType) => {
  const { libPath, libPathMin } = getPaths(libType);

  return esbuildApi.build({
    entryPoints: [libPath],
    outfile: libPathMin,
    minify: true,
  });
};

const esbuildMinify = (libType) =>
  cmdEx(() => run(libType).then(() => {}), `esbuild minify ${libType}`);

module.exports = {
  esbuildMinify,
};
