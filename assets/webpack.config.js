const { resolve } = require('path');

const publicPath = 'http://localhost:3000/'; 
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'inline-source-map',

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
 
    './main.js',
    // entry point

    './assets/scss/index.scss',
    'jquery/dist/jquery.js',
    'tether/dist/js/tether.js',
    'bootstrap/dist/js/bootstrap.js',
  ],

  resolve: {
    alias: {
      components: resolve(__dirname, 'app/components/index.js'),
      reducers: resolve(__dirname, 'app/reducers'),
      actions: resolve(__dirname, 'app/actions'),
      config: resolve(__dirname, 'app/config'),
      store: resolve(__dirname, 'app/store'),
      utils: resolve(__dirname, 'app/utils'),
      sagas: resolve(__dirname, 'app/sagas'),
    },
  },


  output: {
    filename: 'js/app.js',
    path: resolve(__dirname, '../priv/static'),
    publicPath: publicPath,
    hotUpdateChunkFilename: 'hot-update.js',
    hotUpdateMainFilename: 'hot-update.json',
    crossOriginLoading: "anonymous",
  },

  context: resolve(__dirname, 'app'),

  devServer: {
    host: 'localhost',
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    // enable HMR on the server

    historyApiFallback: true,
    // respond to 404s with index.html

    contentBase: resolve(__dirname, '../priv/static'),
    publicPath: '/',

    // overlay: true,

    overlay: {
      warnings: true,
      errors: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/, // files ending with .scss
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })),
      },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
      { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]' },
      { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
      { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]' },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
    }),
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
    new OpenBrowserPlugin({ url: 'http://localhost:4000' }),

    new ExtractTextPlugin({ filename: './css/style.css', disable: false, allChunks: true }),
  ],
};

module.exports = config;
