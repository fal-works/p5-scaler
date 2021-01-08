const sltr = require("@fal-works/s-l-t-r");
const builder = require("@fal-works/bundle-helper/lib/build/browser-module");

// ----------------------------------------------------------------------------

const version = "0.2.1";
const year = "2020";

const moduleName = "p5-scaler";

const bannerContent = `
${moduleName}
A small library for scaling p5.js sketches.
@see https://fal-works.github.io/${moduleName}
@copyright ${year} FAL
@license MIT
@version ${version}
`;

const iifeVarName = "p5s";

const config = {
  bundleDistName: moduleName,
  bannerContent,
  iifeVarName,
  distDir: "lib",
  typesDir: "types",
  tsOutDir: "out",
  srcEntryFileName: "index.ts",
};

const devConfig = {
  ...config,
  format: false,
};

const dev = builder.command(devConfig);
const build = builder.command(config);

// ----------------------------------------------------------------------------

const { cmd, seq, builtin, tools } = sltr;

// sltr.config.setResultSummaryType("list");

const { cleandir } = builtin;
const docs = seq(cleandir("docs"), cmd("typedoc"));

const router = tools.createRouter({ build, dev, docs }, dev);
router.run(process.argv[2]);
