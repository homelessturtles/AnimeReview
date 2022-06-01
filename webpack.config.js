const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
  },
};
