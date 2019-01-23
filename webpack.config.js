const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: '.env.development'});
}

module.exports = (env) => {
    const isProd = env === 'production';
    const mode = isProd ? 'production' : 'development';
    console.log('Webpack mode prod:', isProd);

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
                      'postcss-loader',
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
                args: [`--APP_MODE=${mode}`],
                script: './server/server.js',
                watch: [path.resolve('./dist'), './server/'],
            })
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

    return cfg;
};