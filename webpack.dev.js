const path = require("path");
const common = require("./webpack.common"); //Import the content of webpack.common.js
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common,{ //Merge webpack.common.js with the content in curly braces
    mode: "development",
    output: {
        filename: "js/[name].bundle.js", //Output js file will be called main.bundle.js
        path: path.resolve(__dirname, "dist"), //The output directory where main.[contenthash].js is saved in dist folder
    },
    module:{
        rules: [
            {
                test: /\.scss$/i, //Look for files ending with .scss extension
                use: [
                    "style-loader", //Style-loader injects the css into the DOM
                    "css-loader", //Css-loader turns css into javascript
                    "sass-loader" //Turns sass into css
                ],  
            }
        ]
    },
    plugins: [
        /*Useful plugin for webpack bundles that include a hash in the filename
        Generate an html5 file that includes all webpack bundles in the body using a <script> tag
        The body of the html5 file is provided by template.html*/
        new HtmlWebpackPlugin({template: "./src/template.html"})
    ]
});