const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
          {
            test: /\.scss$/i, //Look for files ending with .scss extension
            use: [
                "style-loader", //Style-loader injects the css into the DOM
                "css-loader", //Css-loader turns css into javascript
                "sass-loader" //Turns sass into css
            ],  
          },
        ],
      },
      plugins: [new HtmlWebpackPlugin({
          template: "./src/template.html"
          /*Useful plugin for webpack bundles that include a hash in the filename
          Generate an html5 file that includes all webpack bundles in the body using a <script> tag
          The body of the html5 file is provided by template.html*/
      })]
}