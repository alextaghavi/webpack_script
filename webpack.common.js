module.exports = {
    entry: {
      main: "./src/index.js", //Look for index.js in de src folder
      vendor: "./src/vendor.js" //Look for vendor.js in de src folder 
    }, 
    module: {
        rules: [
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