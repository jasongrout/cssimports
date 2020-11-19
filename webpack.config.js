const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
  plugins: [new HtmlWebpackPlugin()],
};

module.exports = config;
