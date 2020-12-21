const { transformFiles } = require("@fal-works/mere-file-transformer");
const replaceStream = require("replacestream");

const rules = {
  lineBeforeBlockComment: () => replaceStream(/(.)(\n *\/\*\*)/gm, "$1\n$2"),
};

/** Applies rule `lineBeforeBlockComment`. */
const preFormatFiles = transformFiles(rules.lineBeforeBlockComment);

module.exports = {
  preFormatFiles,
};
