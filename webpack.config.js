const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
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
                watch: [path.resolve('./dist'), './server/'],
            }),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
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