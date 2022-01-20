const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: [path.resolve(__dirname, "./src/javascripts/entry.js")],
  },
  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].html" },
          },
          "extract-loader",
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", ":data-src"],
            },
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              context: path.resolve(__dirname, "src/assets/"),
              outputPath: "assets/images",
              publicPath: (url) => "assets/images/" + url,
              useRelativePaths: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
};
