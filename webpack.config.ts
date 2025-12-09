import { Configuration } from 'webpack';
import path from 'node:path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const config: Configuration = {
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
        extensions: ['.ts']
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
            {
                test: /\.s[ca]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            // Disable calc optimization - postcss-calc doesn't support modern CSS 'infinity' values used by Tailwind v4
                            // See: https://github.com/postcss/postcss-calc/issues/220
                            calc: false,
                        },
                    ],
                },
            }),
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

export default config;