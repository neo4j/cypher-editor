const es = !!process.env.ES;
const path = require("path");

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // useBuiltIns: false,
        modules: es ? false : "commonjs",
        targets: {
          browsers: [
            // 'last 2 versions',
            // 'not ie > 0',
            "chrome > 60"
          ]
        }
        // "targets": "> 0.25%, not dead"
        // "targets": "last 2 versions, > 5%"
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
    [
      "babel-plugin-replace-imports",
      {
        test: /^antlr4$/,
        replacer: "antlr4-js-exports"
      }
    ]
  ]
};
