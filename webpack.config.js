const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const mode = process.env.NODE_ENV;
const isProd = mode === 'production';

let cfg = {
    mode: mode,
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
    plugins: [
        new MiniCssExtractPlugin({
            path: path.join(__dirname, 'dist'),
            filename: isProd ? "app.bundle.min.css" : "app.bundle.css"
        }),
        new NodemonPlugin({
            //args: [ '--mode=\'production\'', 'cross-env azaza=ololo', 'ZHOPA' ],
            args: [`--APP_MODE=${mode}`],
            script: './server/server.js',
            watch: [path.resolve('./dist'), './server/server.js'],
        }),
    ],
};

const prodCfg = {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.min.js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin({})
        ],
    }
};

if (isProd) {
    Object.assign(cfg, prodCfg);
}

module.exports = cfg;