var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
//var autoprefixer = require('autoprefixer');
const webpack = require("webpack");
// const dotenv = require("dotenv");

const Dotenv = require('dotenv-webpack');



const config = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: __dirname + '/dist',
    filename: "app.js",
    publicPath: '/'
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    // add the plugin to your plugins array
    // new Dotenv({
    //   path:'./.env.dev'
    // }),
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body"      
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {    
    contentBase: path.resolve(__dirname, 'public'),
    clientLogLevel: 'none',
    quiet: true,
    port: 8000,
    compress: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    }  
  },
  devtool: "source-map",
  bail: true
};
// HMR support
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
]
module.exports = config;