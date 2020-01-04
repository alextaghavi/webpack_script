const path = require("path");
const common = require("./webpack.common"); //Import the content of webpack.common.js
const merge = require("webpack-merge");

module.exports = merge(common,{ //Merge webpack.common.js with the content in curly braces
    mode: "development",
    output: {
        filename: "main.js", //Output js file will will be called main.js
        path: path.resolve(__dirname, "dist") //Place main.[contenthash].js in dist folder
    }
});