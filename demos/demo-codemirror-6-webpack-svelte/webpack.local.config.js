const path = require("path");
const fs = require("fs");

const webpackConfig = require("./webpack.config");

const namedPackages = [
  "@neo4j-cypher/codemirror",
  "@neo4j-cypher/editor-support",
  // "@neo4j-cypher/react-codemirror",
  "@neo4j-cypher/svelte-codemirror"
].map(name => ({ name, type: "named" }));

const indexPackages = [
  "@neo4j-cypher/antlr4",
  "@neo4j-cypher/antlr4-simple",
  "@neo4j-cypher/extract-statements"
].map(name => ({ name, type: "index" }));

const demoPackages = [
  "demo-base",
  // "demo-base-react",
  "demo-base-svelte"
].map(name => ({ name, type: "demo" }));

const allPackages = namedPackages.concat(indexPackages).concat(demoPackages);

const localPackages = allPackages.reduce((lp, pkg) => {
  const { name, type } = pkg;
  const pathName = name.includes("/") ? name.substring(name.indexOf("/") + 1) : name;
  const basePath = type === "demo" ? "../" : "../../packages/";
  lp[name] = {
    rootPath: basePath + pathName,
    entry: {
      srcPath: "src",
      entryFile: type === "named" ? pathName + ".js" : "index.js"
    }
  };
  return lp;
}, {});

const basePath = process.cwd();
const babelConfigPath = path.join(__dirname, "../../babel.config.js");

const modulePackages = [path.join(basePath, "../../node_modules")];

const description = "Local Packages Map";
const babelCacheDirectory = true;
const sourceRegexp = /\.js?$/;

const packageToEntryFileMap = {};
const packageToSrcPathMap = {};

let stats;
let foundSrcPath;
let foundEntryFile;
let allFound = true;

for (let packageName of Object.keys(localPackages)) {
  const packageObject = localPackages[packageName];

  const { rootPath, entry } = packageObject;
  if (entry !== undefined) {
    const { srcPath, entryFile } = entry;
    const localSrcPath = path.join(rootPath || "", srcPath || "");
    const localEntryFile = path.join(localSrcPath, entryFile);
    try {
      foundSrcPath = path.resolve(basePath, localSrcPath);
      foundEntryFile = path.resolve(basePath, localEntryFile);
      stats = fs.statSync(foundEntryFile);
      if (stats.isDirectory() || stats.isFile()) {
        packageToEntryFileMap[packageName] = foundEntryFile;
        packageToSrcPathMap[packageName] = foundSrcPath;
        console.log(
          description + " - resource found: ",
          packageName,
          foundEntryFile
        );
      } else {
        console.warn(
          description + " - resource was not a file or directory: ",
          packageName,
          localEntryFile
        );
        allFound = false;
      }
    } catch (error) {
      console.warn(
        description + " - error loading resource: ",
        packageName,
        localEntryFile
      );
      allFound = false;
    }
  }
}
if (!allFound) {
  console.warn(
    description + " - base path for the above errors was: ",
    basePath
  );
  process.exit(1);
}

let resolve = webpackConfig.resolve || {};

const extraAlias = {
  "@neo4j-cypher/codemirror/css/cypher-codemirror.css": path.resolve(
    basePath,
    "../../packages/codemirror/css/cypher-codemirror.css"
  ),
  "demo-base/css/app.css": path.resolve(basePath, "../demo-base/css/app.css")
};

resolve = {
  ...resolve,
  modules: [...(resolve.modules || []), ...modulePackages],
  alias: { ...(resolve.alias || {}), ...extraAlias, ...packageToEntryFileMap },
  extensions: [".js", ".json"]
};

let rules = (
  webpackConfig.module.rules ? webpackConfig.module.rules : []
).slice();

for (let packageName of Object.keys(packageToSrcPathMap)) {
  const packageSrcPath = packageToSrcPathMap[packageName];

  const options = {
    // babelrcRoots: packageSrcPath,
    cacheDirectory: babelCacheDirectory,
    configFile: babelConfigPath
  };

  rules.push({
    test: sourceRegexp,
    loader: "babel-loader",
    options: options,
    include: packageSrcPath
  });
}

webpackConfig.resolve = resolve;
webpackConfig.module.rules = rules;

// console.log(JSON.stringify(webpackConfig, null, '  '))

module.exports = webpackConfig;
