const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js", //Look for index.js in de src folder
    plugins: [new HtmlWebpackPlugin({
      template: "./src/template.html"
      /*Useful plugin for webpack bundles that include a hash in the filename
      Generate an html5 file that includes all webpack bundles in the body using a <script> tag
      The body of the html5 file is provided by template.html*/
    })],
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
          {
            test: /\.html$/, //Look for files ending with .html extension
            use: ["html-loader"] //Transform a src attribute into a require() call
          },
          {
            test: /\.(svg|png|jpg|gif)$/, //Look for files ending with .svg, .png, .jpg or .gif extension
            use: {
              loader: "file-loader",
              /*Resolve import/require() on the above mentioned files into a url and produce the file into the output directory
              html-loader and file-loader work together*/
              options: {
                name: "[name].[hash].[ext]", //When creating image, keep same name, include a hash and keep same extention
                outputPath: "img", //Create an img folder and place images in here
                esModule: false //This is important to set, otherwise images will not load properly
              }
            }
          }
        ],
      }
}