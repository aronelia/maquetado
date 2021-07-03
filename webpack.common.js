const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  entry: {
    theme: './assets/js/theme.js',
  },
  output: {
    path: __dirname,
    filename: 'theme.js'
  },
  resolve: {
    alias: {
      '$': path.resolve(__dirname, 'assets/js'),
      '$c': path.resolve(__dirname, 'assets/js/components'),
    }
  },
  devtool: isDev && 'source-map',
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              sassOptions: {
                outputStyle: isDev ? 'nested' : 'compressed',
              }
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};
