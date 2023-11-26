const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./out/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      assert: require.resolve("assert"),
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },
};
