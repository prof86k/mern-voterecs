const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
    name: 'server',
    entry: './server/server.js',
    target:'node',
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'server.generated.js',
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js||.jsx ||.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }

        ]
    }
}

module.exports = config;