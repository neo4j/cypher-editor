const es = !!process.env.ES;
const path = require('path');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns: false,
        modules: es ? false : 'commonjs',
        targets: {
          browsers: [
            // 'last 2 versions',
            // 'not ie > 0',
            'chrome > 60',
          ],
        },
        // "targets": "> 0.25%, not dead"
        // "targets": "last 2 versions, > 5%"
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    // [
    //   'module-resolver',
    //   {
    //     // Avoid "Could not resolve ... in ..." warnings
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //     // Resolve alias
    //     alias: {
    //       // '^@neo4j-importer/(.+)': ([, name]) =>
    //       //   path.join(__dirname, `packages/${name}/src/${name}`),
    //       '@neo4j-importer/user-interface': path.join(__dirname, 'packages/user-interface/src'),
    //       '@neo4j-importer/data-model': path.join(__dirname, 'packages/data-model/src'),
    //       '@neo4j-importer/file-loader': path.join(__dirname, 'packages/file-loader/src'),
    //       '@neo4j-importer/cypher-generator': path.join(__dirname, 'packages/cypher-generator/src'),
    //       '@neo4j-importer/cypher-runner-worker': path.join(
    //         __dirname,
    //         'packages/cypher-runner-worker/src',
    //       ),
    //       '@neo4j-importer/arrows': path.join(__dirname, 'packages/arrows/src')
    //     }
    //   }
    // ]
  ]
};
