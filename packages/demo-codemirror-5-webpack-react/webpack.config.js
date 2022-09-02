const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackDeployPlugin = require('html-webpack-deploy-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { NODE_ENV } = process.env;

const mode = NODE_ENV;
const isDev = mode !== 'production';

const basePath = __dirname;
const USE_STATIC = false;
const publicPath = USE_STATIC ? '/static/' : '/';

const babelConfigPath = path.join(__dirname, '../../babel.react.config.js');

module.exports = {
  resolve: {
    alias: {
    },
    modules: [
      path.resolve(basePath, '../../node_modules'),
      path.resolve(basePath, 'node_modules'),
      // path.resolve(basePath, 'packages'),
      // path.resolve(basePath, 'src')
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
    // plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    mainFields: ['browser', 'module', 'main']
  },
  mode: NODE_ENV,
  entry: [path.join(basePath, 'src/main.js')],
  output: {
    filename: 'app-[hash].js',
    chunkFilename: '[name]-[hash].bundle.js',
    // publicPath: publicPath,
    publicPath,
    path: USE_STATIC ? path.join(basePath, 'dist/static') : path.join(basePath, 'dist')
  },
  plugins: [
    new Webpack.DefinePlugin({
      PUBLIC_PATH: JSON.stringify(publicPath)
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      path: 'dist',
      filename: USE_STATIC ? '../index.html' : 'index.html',
      // favicon: 'src/favicon.ico'
    }),
    new HtmlWebpackDeployPlugin({
      addAssetsPath: assetPath => assetPath,
      assets: {
        copy: [
          { from: '../cypher-codemirror5/css', to: 'css/' },
        ],
        links: ['css/cypher-codemirror.css'],
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // "include" will fail the transpile
        // include: [path.join(basePath, 'src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          configFile: babelConfigPath,
        }
      },
      // Disable sass for now
      // {
      //   test: /\.scss$/,
      //   // include: sassPath,
      //   exclude: /node_modules/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     "sass-loader"
      //   ]
      // },
      {
        test: /\.css$/, // global css files that don't need any processing
        // include: [path.join(basePath, 'src')],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        include: [path.join(basePath, 'src')],
        use: 'file-loader?limit=20480&name=assets/[name]-[hash].[ext]'
      },
      {
        test: /\.woff$/,
        include: [path.join(basePath, 'src')],
        use: 'file-loader?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.woff2$/,
        include: [path.join(basePath, 'src')],
        use: 'file-loader?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.[ot]tf$/,
        include: [path.join(basePath, 'src')],
        use: 'file-loader?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.eot$/,
        include: [path.join(basePath, 'src')],
        use: 'file-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]'
      }
    ]
  },
  optimization: {},
  // devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  devtool:  isDev ? 'eval-source-map' : 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3004,
    historyApiFallback: USE_STATIC ? { index: '/static/../index.html' } : true
  }
};
