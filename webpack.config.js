const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.ts'
    },
    devtool: false,
    output: {
        clean: true,
        filename: (pathData) => {
            return pathData.chunk?.name === 'runtime' || pathData.chunk?.name === 'main' ? 'js/[name].js' : 'js/[name]-[hash].js';
        },
        path: path.resolve(__dirname, 'data/common/resources'),
        chunkFilename: 'js/chunks/[name]-[hash].js',
    },
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js']
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
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
    optimization: {
        splitChunks: {
            filename: 'js/split/[name]-[hash].js',
            minChunks: 1,
            minSize: 100_000,
        },
        minimizer: [
            new CssMinimizerPlugin(),
        ],
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
                    to: path.resolve(__dirname, 'data/common/resources/img/')
                },
            ],
        }),
    ],
};
