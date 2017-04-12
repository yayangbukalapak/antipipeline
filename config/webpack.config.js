// Example webpack configuration with asset fingerprinting in production.
'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
var globalConfig = require(path.join(__dirname, "..", "webpack", "config.js"));

// must match config.webpack.dev_server.port
var devServerPort = 3808;

// set NODE_ENV=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production';

var config = {
    context: path.join(__dirname, '..', 'webpack'),
    entry: './application.js',
    output: {
        path: path.join(__dirname, '..', 'public', 'webpack'),
        publicPath: '/webpack/',
        filename: production ? '[name]-[chunkhash].js' : '[name].js',
        chunkFilename: "[hash]/js/[id].js",
        hotUpdateMainFilename: "[hash]/update.json",
        hotUpdateChunkFilename: "[hash]/js/[id].update.js"
    },
    resolve: {
        alias: {
            'config': path.resolve(__dirname, '..', 'webpack', 'config.js'),
            'vue': path.resolve(__dirname, '..', 'node_modules', 'vue', 'dist', 'vue.common.js'),
            'components': path.resolve(__dirname, '..', 'webpack', 'components'),
            'data' : path.resolve(__dirname, '..', 'webpack', 'data'),
            'views': path.resolve(__dirname, '..', 'webpack', 'views'),
            'js': path.resolve(__dirname, '..', 'public', 'webpack', 'js'),
            'css': path.resolve(__dirname, '..', 'webpack', 'assets', 'styles'),
            'img': path.resolve(__dirname, '..', 'public', 'webpack', 'images'),
        }
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CleanObsoleteChunks(),
        new StatsPlugin('manifest.json', {
            // We only need assetsByChunkName
            chunkModules: false,
            source: false,
            chunks: false,
            modules: false,
            assets: true
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    }
};

if (production) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  );
} else {
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  console.log(globalConfig.domain);
  config.output.publicPath = globalConfig.domain;
}

module.exports = config;