const path = require("path");
const common = require("./webpack.common"); //Import the content of webpack.common.js
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src')
  }

module.exports = merge(common,{ //Merge webpack.common.js with the content in curly braces
    mode: "production",
    output: {
        filename: "js/[name].[contenthash].bundle.js", //Output js file will contain different hash with each edited version
        path: path.resolve(__dirname, "dist") //Place main.[contenthash].js in dist folder
    },
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
        new MiniCssExtractPlugin({filename: 'css/[name].[contenthash].css'}),
        new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            }
        }),
        new PurgecssPlugin({ //PurgeCSS is a tool to remove unused CSS.
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
    ],
    module:{
        rules:[
            {
                test: /\.scss$/i, //Look for files ending with .scss extension
                use: [
                    MiniCssExtractPlugin.loader, //Extract css into files
                    "css-loader", //Css-loader turns css into javascript
                    {
                        loader: 'postcss-loader', //A tool for transforming css with javaScript
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                            postcssPresetEnv() //includes autoprefixer and polyfills and future enabled css(https://preset-env.cssdb.org/) 
                            ]
                        }
                    }, 
                    "sass-loader" //Turns sass into css
                ], 
              },
        ]
    }
});