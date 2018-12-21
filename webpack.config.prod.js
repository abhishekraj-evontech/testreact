var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin =require('extract-text-webpack-plugin');
const WebpackMd5Hash=require('webpack-md5-hash');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

const config = {
  node: {
    fs: 'empty'
  },
    entry: {
        app: './src/index.js',        
    },    
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'app.js',
      publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'] 
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
          
        new WebpackMd5Hash(),
        
        new Dotenv({
          path: './.env.prd', // load this now instead of the ones in '.env'          
          systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        }),
    
        // Minify JS
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          }
          // sourceMap: false
        }),
    
          new webpack.DefinePlugin({
              "process.env": {
                NODE_ENV: JSON.stringify("production")
              }
          }),
          
    
        new webpack.optimize.AggressiveMergingPlugin(),
    
        new webpack.NoEmitOnErrorsPlugin(),
    
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            // filename: "vendor.js"
            // (Give the chunk a different name)
            minChunks: Infinity
        }),
    
        // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
        new HtmlWebpackPlugin({
          //favicon:'src/App/assets/img/favicon.ico',
          template: "public/index.html",
          inject: true
        }),

        new CleanWebpackPlugin(['dist']),

        new webpack.HotModuleReplacementPlugin(),
        // new CopyWebpackPlugin([
        //   // relative path is from src
        //   { from: 'src/App/assets/img/fav-icons/' }, 
        // ])
],   
    target: 'web',
    devServer: {
      historyApiFallback: true  
    },
    devtool: "source-map",    
    bail: true
}
config.externals = {
  'react': 'React',
  'react-dom': 'ReactDOM'
};

module.exports = config;


