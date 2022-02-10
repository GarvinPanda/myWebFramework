const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
//样式loader
const styleLoader = (cssOptions, processor) => {
    return [
        "style-loader",
        // {
        //     loader: MiniCssExtractPlugin.loader,
        // },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        'postcss-loader',
        processor == "less-loader" &&
        {
            loader: require.resolve("less-loader"),
            options: {
                sourceMap: true,
                lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                        
                        "@RES_PATH": path.resolve(__dirname, "./src/assets"),
                    },
                }
            },
        }
    ].filter(Boolean);
}

//rules
const rules = [
    {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: styleLoader(
            {
                importLoaders: 1,
                sourceMap: true,
            }
        ),
        sideEffects: true,
    },
    {
        test: /\.module\.css$/,
        use: styleLoader(
            {
                importLoaders: 1,
                sourceMap: true,
                modules: {
                    getLocalIdent: getCSSModuleLocalIdent
                }
            }
        ),
    },
    {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: styleLoader(
            {
                importLoaders: 3,
                sourceMap: true,
            },
            "less-loader"
        ),
        sideEffects: true,
    },
    {
        test: /\.module\.less$/,
        use: styleLoader(
            {
                importLoaders: 3,
                sourceMap: true,
                modules: {
                    getLocalIdent: getCSSModuleLocalIdent
                },

            },
            "less-loader"
        ),
    },
    {
        test: /\.(t|j)sx?$/,
        use: ['babel-loader'],
    },
    {
        test: [/\.(jpg|jpeg|png|svg|bmp)$/, /\.(eot|woff2?|ttf|svg)$/],
        loader: require.resolve("url-loader"),
        options: {
            name: "imgs-[hash:10].[ext]",
            outputPath: "assets",
            publicPath: '../assets/',
            limit: 1024,
        },
    }
].filter(Boolean);

module.exports = {
    entry: {
        index: path.resolve(__dirname, "./src/App.tsx")
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: 'js/[name].js',
    },
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    module: {
        rules: rules
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            template: "./public/index.html",
            minify: false,
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new CleanWebpackPlugin(),
    ].filter(Boolean)
}