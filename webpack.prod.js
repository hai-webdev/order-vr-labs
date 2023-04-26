const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.js");
const WebpackBundleAnalyzer =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CmpressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Purgecss = require("purgecss-webpack-plugin");
const path = require("path");
const globAll = require("glob-all");
const srcAbs = path.resolve(__dirname, "src"); //得到src的绝对路径
const htmlPath = path.resolve(__dirname, "public/index.html");
const paths = globAll.sync([`${srcAbs}**/*.js`, htmlPath]);
// webpack的生产环境配置，从基本配置中合并
// 合并是利用 webpack-merge 完成的： https://github.com/survivejs/webpack-merge
const prodConfig = {
  mode: "production",
  devtool: "none",
  plugins: [new WebpackBundleAnalyzer()],
  externals: {
    jquery: "jQuery",
    // swiper:"Swiper"
    // axios: "axios",
  },
  optimization: {
    splitChunks: {
      //分包配置
      chunks: "all",
      cacheGroups: {
        styles: {
          minSize: 0,
          test: /\.css$/,
          minChunks: 2,
        },
      },
    },
    // 是否要启用压缩，默认情况下，生产环境会自动开启
    // minimize: true,
    minimizer: [
      // 压缩时使用的插件，可以有多个
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
};

module.exports = merge(baseConfig, prodConfig);
