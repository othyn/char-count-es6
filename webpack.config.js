const webpack = require('webpack');
const path = require('path');
// Imports

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
// Webpack plugins

module.exports = env => {

    // As I need to use env, webpack needs to be defined as a function

    let plugins = [],
        entry = '',
        outputFile = ''
        outputPath = '';
    // Store build options

    if (env === 'prod') {

        entry = path.resolve('./src/char-count.js');
        // Build lib

        plugins.push(new UglifyJsPlugin({ minimize: true }));
        // Minify on prod build

        outputFile = 'char-count.min.js';
        outputPath = path.resolve('./dist');
        // Prod build location/file

    } else {

        entry = path.resolve('./src/example.app.js');
        // Build example app

        plugins.push(new HotModuleReplacementPlugin());
        // Hot module reloading in dev server

        outputFile = 'example.app.js';
        outputPath = path.resolve('./dev');
        // Dev build location/file
    }

    return {
        entry: entry,
        devtool: 'source-map',
        output: {
            path: outputPath,
            filename: outputFile,
            library: 'char-count',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            modules: [
                path.resolve('./node_modules'),
                path.resolve('./src')
            ],
            extensions: ['.json', '.js']
        },
        plugins: plugins,
        devServer: {
            publicPath: '/',
            port: 8080,
            contentBase: path.resolve('./dev'),
            host: 'localhost',
            historyApiFallback: true,
            noInfo: false,
            stats: 'minimal',
            hot: true
        }
    }
};
// Webpack Config
