const path = require("path");
const common = require("./webpack.common"); //Import the content of webpack.common.js
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common,{ //Merge webpack.common.js with the content in curly braces
    mode: "production",
    output: {
        filename: "[name].[contenthash].bundle.js", //Output js file will contain different hash with each edited version
        path: path.resolve(__dirname, "dist") //Place main.[contenthash].js in dist folder
    },
    // optimization: {
    //     minimizer: []
    // },
    plugins: [
        new CleanWebpackPlugin(), 
        new HtmlWebpackPlugin({
            template: './src/template.html',
            /*Useful plugin for webpack bundles that include a hash in the filename
            Generate an html5 file that includes all webpack bundles in the body using a <script> tag
            The body of the html5 file is provided by template.html*/
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
        new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            }
        })
    ],
    module:{
        rules:[
            {
                test: /\.scss$/i, //Look for files ending with .scss extension
                use: [
                    MiniCssExtractPlugin.loader, //Extract css into files
                    "css-loader", //Css-loader turns css into javascript
                    "sass-loader" //Turns sass into css
                ],  
              },
        ]
    }
});