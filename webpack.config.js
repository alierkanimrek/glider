const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.ts",
    resolve: {
        extensions: ['.js', '.ts', '.css', '.ghtml']
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
            {
                test:/\.css$/,
                exclude: /node_modules/,
                use:['style-loader','css-loader']
            },
            {
            test: /\.ghtml$/,
            use: 'raw-loader',
            }
        ]
    }
};