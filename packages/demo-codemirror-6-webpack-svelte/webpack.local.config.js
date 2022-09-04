const path = require("path");
const fs = require("fs");

const webpackConfig = require("./webpack.config");

const isEmptyDirectory = (dir) =>
  fs.readdirSync(dir).filter((file) => !file.startsWith(".")).length === 0;

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(
      (dirent) =>
        dirent.isDirectory() &&
        !isEmptyDirectory(path.join(source, dirent.name))
    )
    .map((dirent) => dirent.name);

const getCurrentDirectoryName = () =>
  __dirname.substring(path.join(__dirname, "../").length);

const currentPackage = getCurrentDirectoryName();
const packages = getDirectories(path.join(__dirname, "../")).filter(
  (package) =>
    package !== currentPackage &&
    (package === "demo-base" ||
      (!package.startsWith("demo") && !package.startsWith("svelte")))
);

const scopePrefix = "";

const localPackages = packages.reduce((lp, p) => {
  lp[scopePrefix + p] = {
    rootPath: "../" + p,
    entry: {
      srcPath: "src",
      entryFile: "index.js"
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
const packageToRootPathMap = {};

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
        packageToRootPathMap[packageName] = rootPath || "";
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
  "cypher-codemirror/css/cypher-codemirror.css": path.resolve(
    basePath,
    "../cypher-codemirror/css/cypher-codemirror.css"
  )
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
  let packageSrcPath = packageToSrcPathMap[packageName];
  const packageRootPath = packageToRootPathMap[packageName];

  // console.log('package: ' + packageName + ' - ' + packageRootPath);

  // console.log('package: ' + packageName + ' - ' + path.join(
  //   path.resolve(basePath, packageRootPath), './babel.config.js'
  // ));

  let options = {
    // babelrcRoots: packageSrcPath,
    cacheDirectory: babelCacheDirectory,
    configFile: babelConfigPath
  };
  let include = packageSrcPath;

  // const localPackage = localPackages[packageName];
  // if (localPackage && localPackage.entry && !localPackage.entry.srcPath) {
  //   options = {
  //     babelrc: false,
  //     cacheDirectory: babelCacheDirectory
  //   };
  //   include = path.join(basePath, packageSrcPath);
  // }

  rules.push({
    test: sourceRegexp,
    loader: "babel-loader",
    options: options,
    include: include
  });
}

webpackConfig.resolve = resolve;
webpackConfig.module.rules = rules;

// console.log(JSON.stringify(webpackConfig, null, '  '))

module.exports = webpackConfig;
