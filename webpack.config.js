const path = require('node:path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    main: './src/index.ts',
  },
  devtool: false,
  output: {
    clean: true,
    filename: (pathData) => {
      return pathData.chunk && (pathData.chunk.name === 'runtime' || pathData.chunk.name === 'main')
        ? 'js/[name].js'
        : 'js/[name]-[contenthash].js';
    },
    path: path.resolve(__dirname, 'data/common/resources'),
    chunkFilename: 'js/chunks/[name]-[contenthash].js',
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(s|)[ca]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: false },
          },
          {
            loader: 'postcss-loader',
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      filename: 'js/split/[name]-[contenthash].js',
      minChunks: 1,
      minSize: 100_000,
    },
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
    runtimeChunk: 'single',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/chunks/[id].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets-img'),
          to: path.resolve(__dirname, 'data/common/resources/img/'),
        },
      ],
    }),
  ],
};
