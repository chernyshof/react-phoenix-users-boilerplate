const { resolve } = require('path');

const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    // 'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    // 'webpack/hot/only-dev-server',
    './main.js',
    './assets/scss/main.scss',
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
    publicPath: '/',
  },

  context: resolve(__dirname, 'app'),

  devServer: {
    hot: false,
    contentBase: resolve(__dirname, '../priv/static'),
    publicPath: '/',
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
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [
        //     'css-loader',
        //     {
        //       loader: 'sass-loader',
        //       query: {
        //         sourceMap: false,
        //       },
        //     },
        //   ],
        // }),
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
    // new ExtractTextPlugin({ filename: 'css/style.css', disable: false, allChunks: true }),
    new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
    // new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
