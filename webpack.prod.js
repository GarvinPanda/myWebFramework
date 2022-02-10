const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    target: 'browserslist',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        })
    ].filter(Boolean),
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                sourceMap: true,
                extractComments: false,
                parallel: true,
                terserOptions: {
                    compress: {
                        pure_funcs: ["console.log"],
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
});