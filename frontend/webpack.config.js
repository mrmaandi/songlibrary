const { resolve } = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html'
        })
    ]
};