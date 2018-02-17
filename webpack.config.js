const webpack = require('webpack');
const path = require('path');
// Imports

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// Webpack plugins

let plugins = [],
    outputFile;
// Store build options

if (env === 'production') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = 'char-count.min.js';
} else {
    outputFile = 'char-count.js';
}
// Build environment options

module.exports = {
    entry: path.resolve('./src/char-count.js'),
    devtool: 'source-map',
    output: {
        path: path.resolve('./dist'),
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
    plugins: plugins
};
// Webpack Config
