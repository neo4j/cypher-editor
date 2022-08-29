/*
 * Copyright (c) 2002-2017 "Neo Technology,"
 * Network Engine for Objects in Lund AB [http://neotechnology.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpackCommon = require('./webpack.common');

const outputPath = path.resolve(__dirname, 'demo', 'vanilla');

const codemirror = {
  entry: './dev/vanilla/codemirror-bundle.js',
  output: {
    filename: 'codemirror-bundle.js',
    path: outputPath,
    libraryTarget: 'var',
    library: 'codemirror',
  },
  module: {
    rules: [
      webpackCommon.babel,
      webpackCommon.cssLibrary,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dev/vanilla/index.html',
      inject: false,
    }),
  ],
};

const common = {
  entry: './dev/common.js',
  output: {
    filename: 'common.min.js',
    path: outputPath,
    libraryTarget: 'var',
    library: 'common',
  },
  module: {
    rules: [
      webpackCommon.babel,
    ],
  },
};

module.exports = [
  codemirror,
  common,
];
