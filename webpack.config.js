const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.ts",
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader"
            },
        ]
    },
};