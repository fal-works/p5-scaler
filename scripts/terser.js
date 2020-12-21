const { getPaths } = require("./lib-type");
const { cmd } = require("@fal-works/s-l-t-r");

const terser = (libType) => {
  const { libPath, libPathMin } = getPaths(libType);

  return cmd(
    "terser",
    libPath,
    "-c",
    "-m",
    `-o ${libPathMin}`,
    "--comments",
    "--ecma 6"
  ).rename(`terser ${libType}`);
};

module.exports = {
  terser,
};
