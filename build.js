const sltr = require("@fal-works/s-l-t-r");
const builder = require("@fal-works/bundle-helper/lib/build/for-browsers");

// ----------------------------------------------------------------------------

const version = "0.2.0";
const year = "2020";

const distName = "p5-scaler";

const banner = `/**
 * ${distName}
 * --------------------------------------------------------------------------
 * A small library for scaling p5.js sketches.
 * https://fal-works.github.io/${distName}/
 * @copyright ${year} FAL
 * @license MIT
 * @version ${version}
 */
`;

const iifeVarName = "p5s";

const build = builder.command({
  distName,
  banner,
  distDir: "lib",
  typesDir: "types",
  tsOutDir: "out",
  iifeVarName,
  srcEntryFileName: "index.ts",
  tscArgs: ["--skipLibCheck"],
});

// ----------------------------------------------------------------------------

const { cmd, seq, builtin, tools } = sltr;

// sltr.config.setResultSummaryType("list");

const { cleandir } = builtin;
const docs = seq(cleandir("docs"), cmd("typedoc"));

const router = tools.createRouter({ build, docs }, build);
router.run(process.argv[2]);
