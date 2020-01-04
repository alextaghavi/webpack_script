const path = require("path");
const common = require("./webpack.common"); //Import the content of webpack.common.js
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = merge(common,{ //Merge webpack.common.js with the content in curly braces
    mode: "production",
    output: {
        filename: "main.[contenthash].js", //Output js file will contain different hash with each edited version
        path: path.resolve(__dirname, "dist") //Place main.[contenthash].js in dist folder
    },
    plugins: [new CleanWebpackPlugin()]
});