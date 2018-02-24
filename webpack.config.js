let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let autoprefixer = require('autoprefixer');
// Imports

let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
// Webpack plugins

module.exports = env => {

    // As I need to use env, webpack needs to be defined as a function

    let entry,
        outputFile = ''
        outputPath = '',
        rules = [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }
        ],
        plugins = []
    // Store default build options

    if (env === 'prod') {

        entry = path.resolve('./src/char-count.js');
        // Build lib

        outputFile = 'char-count.min.js';
        outputPath = path.resolve('./dist');
        // Prod build location/file

        plugins.push(new UglifyJsPlugin({ minimize: true }));
        // Minify on prod build

    } else {

        entry = [
            path.resolve('./src/example.app.js'),
            path.resolve('./src/scss/example.app.scss')
        ];
        // Build example app

        outputFile = 'example.app.js';
        outputPath = path.resolve('./dev');
        // Dev build location/file

        rules.push({
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [ require('autoprefixer')({ browsers: ['> 1%', 'Last 2 versions'] }) ]
                        }
                    },
                    'sass-loader'
                ],
                fallback: ['style-loader']
            })
        });
        // Add SASS build to rules

        plugins.push(new HotModuleReplacementPlugin());
        // Hot module reloading in dev server

        plugins.push(new ExtractTextPlugin('example.app.css'));
        // Hot module reloading in dev server
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
            rules: rules
        },
        resolve: {
            modules: [
                path.resolve('./node_modules'),
                path.resolve('./src')
            ],
            extensions: ['.json', '.js', '.scss']
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
