const { dir, moduleName, iifeName } = require("../config");

const LibType = {
  Iife: "iife",
  Esm: "esm",
};

const formatExtensionTable = {
  iife: ".js",
  esm: ".mjs",
};
const getExtension = (libType) => {
  const ext = formatExtensionTable[libType];
  if (!ext) throw `Invalid format: ${libType}`;
  return ext;
};

/** @param libType LibType */
const getPaths = (libType) => {
  const extension = getExtension(libType);

  const libPath = `${dir.lib}/${moduleName}${extension}`;
  const libPathMin = `${dir.lib}/${moduleName}.min${extension}`;

  return { libPath, libPathMin };
};

/** @param libType LibType */
const getGlobalName = (libType) =>
  libType === LibType.Iife ? iifeName : undefined;

module.exports = {
  LibType,
  getPaths,
  getGlobalName,
};
