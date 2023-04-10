const path = require('path');
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './client/src/index.js',
    name: 'browser',
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js||.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]

}