// ---- Import -------- ---------------------------------------------------

const sltr = require("@fal-works/s-l-t-r");

const { dir } = require("../config");

const { LibType, getPaths } = require("./lib-type");
const { preFormatFiles } = require("./pre-formatter");
const { rollup } = require("./rollup");

// const { terser } = require("./terser");
// const minify = terser;

const { esbuildMinify } = require("./esbuild-minify");
const minify = esbuildMinify;

// ---- Config ------------------------------------------------------------

// sltr.debug.emitVerboseLog(true);
// sltr.config.setResultSummaryType("list");

// ---- Prepare -----------------------------------------------------------

const { cmd, seq, par, cmdEx } = sltr;

const clean = (files) => cmd("rimraf", files);
const cleanDir = (dir) => clean(`${dir}/*`);

const format = (files) =>
  seq(
    cmdEx(() => preFormatFiles(files), `pre-format`),
    cmd("prettier", "--write", "--loglevel warn", `"${files}"`).rename(
      "prettier"
    )
  ).rename(`format ${files}`);

// ---- Construct ---------------------------------------------------------

const bundleMinifyFormatFor = (libType) =>
  seq(
    rollup(libType),
    minify(libType),
    format(getPaths(libType).libPath)
  ).rename(libType);

const bundleMinifyFormat = par(
  bundleMinifyFormatFor(LibType.Iife),
  bundleMinifyFormatFor(LibType.Esm)
);

const lib = seq(cleanDir(dir.lib), bundleMinifyFormat).rename("lib");

const formatTypes = format(`${dir.types}/**/*.d.ts`);

const transpile = seq(
  par(cleanDir(dir.types), cleanDir(dir.rollupInput)),
  cmd("tsc", "--skipLibCheck")
).rename("transpile");

// ---- Public Commands --------------------------------------------------

const build = seq(transpile, par(lib, formatTypes)).rename("build");
const docs = seq(cleanDir(dir.docs), cmd("typedoc")).rename("docs");

const cleanAll = par(
  cleanDir(dir.lib),
  cleanDir(dir.types),
  cleanDir(dir.rollupInput),
  cleanDir(dir.docs)
).rename("clean-up");

const router = sltr.tools.createRouter({
  build,
  docs,
  clean: cleanAll,
});
router.run(process.argv[2]);
