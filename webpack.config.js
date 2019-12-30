const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: [
                "style-loader", //style-loader injects the css into the DOM
                "css-loader", //css-loader turns css into javascript
                "sass-loader" //turns sass into css
            ],  
          },
        ],
      },
}